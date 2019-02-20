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

namespace Learn\Migration\Model;

use Migration\Handler\AbstractHandler;
use Migration\ResourceModel\Record;

/**
 * Class SuffixAdd
 *
 * @category Learn
 * @package Learn_Migration
 * @author Vladimir Savchenko
 */
class SuffixAdd extends AbstractHandler
{

    const SUFFIX = '_m2';

    /**
     * @inheritdoc
     */
    public function handle(Record $recordToHandle, Record $oppositeRecord)
    {
        $this->validate($recordToHandle);
        $convertedValue = $recordToHandle->getValue($this->field) . self::SUFFIX;
        $recordToHandle->setValue($this->field, $convertedValue);
    }
}
