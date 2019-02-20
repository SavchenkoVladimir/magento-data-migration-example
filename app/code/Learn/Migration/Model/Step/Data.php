<?php
/**
 * Magecom
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to info@magecom.net so we can send you a copy immediately.
 *
 * @category Learn
 * @package Learn_Migration
 * @copyright Copyright (c) 2019 Magecom, Inc. (http://www.magecom.net)
 * @license  http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

namespace Learn\Migration\Model\Step;

use Migration\Logger\Logger;
use Migration\App\ProgressBar;
use Migration\ResourceModel\Destination;
use Migration\ResourceModel\Source;
use Migration\ResourceModel\RecordFactory;

/**
 * Class Data
 *
 * @category Learn
 * @package Learn_Migration
 * @author Vladimir Savchenko
 */
class Data implements \Migration\App\Step\StageInterface
{

    const COMBINE_TABLE_1 = 'migration_connect_me_table_1';

    const COMBINE_TABLE_2 = 'migration_connect_me_table_2';

    const DESTINATION_TABLE = 'migration_combine_me_table';

    const SPLIT_SOURCE_TABLE = 'migration_split_me_table';

    const SPLIT_DESTINATION_MAIN = 'migration_split_me_table_main';

    const SPLIT_DESTINATION_PERSON = 'migration_split_me_table_person';

    /**
     * @var Destination
     */
    protected $destination;

    /**
     * @var Logger
     */
    protected $logger;

    /**
     * @var Source
     */
    protected $source;

    /**
     * @var ProgressBar\LogLevelProcessor
     */
    protected $progress;

    /**
     * @var RecordFactory
     */
    protected $factory;

    /**
     * @param Destination $destination
     * @param Source $source
     * @param Logger $logger
     * @param ProgressBar\LogLevelProcessor $progress
     */
    public function __construct(
        Destination $destination,
        Source $source,
        Logger $logger,
        ProgressBar\LogLevelProcessor $progress,
        RecordFactory $factory
    )
    {
        $this->destination = $destination;
        $this->source = $source;
        $this->logger = $logger;
        $this->progress = $progress;
        $this->factory = $factory;
    }

    /**
     * @inheritdoc
     */
    public function perform()
    {
        $this->combineTables();
        $this->splitTables();

        return true;
    }

    /**
     * @return void
     */
    protected function combineTables()
    {
        $destinationTable = $this->destination->getDocument(self::DESTINATION_TABLE);

        $pageNumber = 0;
        while (!empty($tableFirstData = $this->source->getRecords(self::COMBINE_TABLE_1, $pageNumber))) {
            $pageNumber++;
            $recordsToSave = $destinationTable->getRecords();
            $tableTwoData = $this->source->getRecords(self::COMBINE_TABLE_2, $pageNumber);

            foreach ($tableFirstData as $row) {
                $recordData['account_id'] = $row['account_id'];

                if (isset($tableTwoData[$row['id']])) {
                    $recordData['lastname_connect'] = $tableTwoData[$row['id']]['lastname_connect'];
                    $recordData['age'] = $tableTwoData[$row['id']]['age'];
                    $recordData['is_new'] = $tableTwoData[$row['id']]['is_new'];
                }

                $destinationRecord = $this->factory->create([
                    'document' => $destinationTable,
                    'data' => $recordData,
                ]);
                $recordsToSave->addRecord($destinationRecord);
            }
            $this->destination->saveRecords(self::DESTINATION_TABLE, $recordsToSave);
        }
    }

    /**
     * @return void
     */
    protected function splitTables()
    {
        $destinationMain = $this->destination->getDocument(self::SPLIT_DESTINATION_MAIN);
        $destinationPerson = $this->destination->getDocument(self::SPLIT_DESTINATION_PERSON);

        $pageNumber = 0;
        while (!empty($sourceData = $this->source->getRecords(self::SPLIT_SOURCE_TABLE, $pageNumber))) {
            $pageNumber++;
            $recordsToSaveMain = $destinationMain->getRecords();
            $recordsToSavePerson = $destinationPerson->getRecords();

            foreach ($sourceData as $row) {
                $recordDataMain['id'] = $row['id'];
                $recordDataMain['lastname_split_2'] = $row['lastname_split_2'];
                $destinationRecordMain = $this->factory->create([
                    'document'  => $destinationMain,
                    'data'      => $recordDataMain,
                ]);
                $recordsToSaveMain->addRecord($destinationRecordMain);

                $recordDataPerson['id'] = $row['id'];
                $recordDataPerson['account_id_split_1'] = $row['account_id_split_1'];
                $recordDataPerson['name_split_1'] = $row['name_split_1'];
                $recordDataPerson['age_split_1'] = $row['age_split_1'];
                $recordDataPerson['main_table_id'] = $row['id'];
                $destinationRecordPerson = $this->factory->create([
                    'document'  => $destinationPerson,
                    'data'      => $recordDataPerson,
                ]);
                $recordsToSavePerson->addRecord($destinationRecordPerson);
            }

            $this->destination->saveRecords(self::SPLIT_DESTINATION_MAIN, $recordsToSaveMain);
            $this->destination->saveRecords(self::SPLIT_DESTINATION_PERSON, $recordsToSavePerson);
        }
    }
}
