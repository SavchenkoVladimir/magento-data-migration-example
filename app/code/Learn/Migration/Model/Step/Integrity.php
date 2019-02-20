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
use Migration\Reader\MapFactory;
use Migration\ResourceModel;
use Migration\Config;
use Migration\ResourceModel\RecordFactory;

/**
 * Class Integrity
 *
 * @category Learn
 * @package Learn_Migration
 * @author Vladimir Savchenko
 */
class Integrity extends \Migration\App\Step\AbstractIntegrity
{

    const SOURCE_KEY = 'source';

    const DESTINATION_KEY = 'destination';

    /**
     * @var RecordFactory
     */
    protected $factory;

    /**
     * Integrity constructor.
     * @param ProgressBar\LogLevelProcessor $progress
     * @param Logger $logger
     * @param Config $config
     * @param ResourceModel\Source $source
     * @param ResourceModel\Destination $destination
     * @param MapFactory $mapFactory
     * @param string $mapConfigOption
     * @param RecordFactory $factory
     */
    public function __construct(
        ProgressBar\LogLevelProcessor $progress,
        Logger $logger,
        Config $config,
        ResourceModel\Source $source,
        ResourceModel\Destination $destination,
        MapFactory $mapFactory,
        RecordFactory $factory,
        $mapConfigOption = 'map_file'
    )
    {
        $this->factory = $factory;
        parent::__construct($progress, $logger, $config, $source, $destination, $mapFactory, $mapConfigOption);
    }

    /**
     * @inheritdoc
     */
    public function perform()
    {
        // TODO: implement columns checks
        $this->progress->start($this->getIterationsCount());
        $structure = $this->getStructure();
        $keys = [self::SOURCE_KEY, self::SOURCE_KEY];

        foreach ($keys as $key) {
            foreach ($structure[$key] as $name => $value) {
                $document = $this->source->getDocument($name);

                if (!$document) {
                    $message = sprintf('table %s does not exist', $name);
                    $this->logger->error($message);
                }
            }
        }

        $this->progress->finish();

        return $this->checkForErrors();
    }

    /**
     * @return array
     */
    protected function getStructure()
    {
        $structure = [
            self::SOURCE_KEY => [
                Data::SPLIT_SOURCE_TABLE => [],
                Data::COMBINE_TABLE_1 => [],
                Data::COMBINE_TABLE_2 => []
            ],
            self::DESTINATION_KEY => [
                Data::DESTINATION_TABLE => [],
                Data::SPLIT_DESTINATION_MAIN => [],
                Data::SPLIT_DESTINATION_PERSON => []
            ]
        ];

        return $structure;
    }

    /**
     * @inheritdoc
     */
    protected function getIterationsCount()
    {
        return 0;
    }
}
