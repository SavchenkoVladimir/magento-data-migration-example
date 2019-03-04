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

define(
    [
        'ko',
        'uiComponent',
        'Magento_Ui/js/model/messageList',
        'mage/translate',
        'Magento_Checkout/js/checkout-data',
        'uiRegistry'
    ],
    function (
        ko,
        Component,
        messageList,
        $t,
        checkoutData,
        uiRegistry
    ) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Savchenko_CheckoutStep/summary/buttons-set',
                paymentsAllowed: ['cashondelivery_x'],
                paymentPathPrefix: 'checkout.steps.billing-step.payment.payments-list.',
                errorMessage: 'The payment method chosen is not available. Chose other payment, please.'
            },

            /**
             * Place order.
             */
            placeOrder: function (data, event) {
                let selectedPayment = checkoutData.getSelectedPaymentMethod();

                if (this.paymentsAllowed.indexOf(selectedPayment) === -1) {
                    messageList.addErrorMessage({
                        'message': $t(this.errorMessage)
                    });

                    return false;
                }

                let paymentPath = this.paymentPathPrefix + selectedPayment;
                let cacheOnDelivery = uiRegistry.get(paymentPath);
                cacheOnDelivery.placeOrder(data, event);
            }
        });
    }
);