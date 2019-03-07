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
 * @category Savchenko
 * @package Savchenko_CheckoutStep
 * @copyright Copyright (c) 2019 Magecom, Inc. (http://www.magecom.net)
 * @license  http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

var config = {
    'config': {
        'mixins': {
            'Magento_OfflinePayments/js/view/payment/method-renderer/cashondelivery-method': {
                'Savchenko_CheckoutStep/js/view/payment/default-mixin': true
            },
            'Magento_Checkout/js/view/shipping': {
                'Savchenko_CheckoutStep/js/view/shipping/default-mixin': true
            }
        }
    }
}