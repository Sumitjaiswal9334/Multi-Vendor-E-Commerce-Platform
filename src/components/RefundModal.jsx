import React, { useState } from 'react';
import { X, DollarSign, AlertTriangle } from 'lucide-react';
import StripeService from '../services/stripeService';

const RefundModal = ({ isOpen, onClose, order, onRefundSuccess }) => {
  const [refundAmount, setRefundAmount] = useState(order?.total || 0);
  const [refundReason, setRefundReason] = useState('requested_by_customer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !order) return null;

  const handleRefund = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const refund = await StripeService.processRefund(
        order.paymentIntentId,
        refundAmount,
        refundReason
      );

      onRefundSuccess({
        ...refund,
        orderId: order.id,
        originalAmount: order.total,
        refundAmount: refundAmount
      });

      onClose();
    } catch (err) {
      setError(err.message || 'Failed to process refund');
    } finally {
      setIsProcessing(false);
    }
  };

  const refundReasons = [
    { value: 'requested_by_customer', label: 'Requested by customer' },
    { value: 'duplicate', label: 'Duplicate charge' },
    { value: 'fraudulent', label: 'Fraudulent transaction' },
    { value: 'subscription_canceled', label: 'Subscription canceled' },
    { value: 'product_unacceptable', label: 'Product unacceptable' },
    { value: 'product_not_received', label: 'Product not received' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Process Refund</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleRefund} className="p-6 space-y-6">
          {/* Order Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Customer:</strong> {order.customer}</p>
              <p><strong>Original Amount:</strong> ${order.total?.toFixed(2)}</p>
              <p><strong>Payment Status:</strong> {order.status}</p>
            </div>
          </div>

          {/* Refund Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refund Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="number"
                step="0.01"
                min="0"
                max={order.total}
                value={refundAmount}
                onChange={(e) => setRefundAmount(parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Maximum refund amount: ${order.total?.toFixed(2)}
            </p>
          </div>

          {/* Refund Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refund Reason
            </label>
            <select
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {refundReasons.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Important Notice</p>
                <p>This action cannot be undone. The refund will be processed immediately and may take 5-10 business days to appear on the customer's statement.</p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || refundAmount <= 0 || refundAmount > order.total}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
            >
              {isProcessing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : null}
              {isProcessing ? 'Processing...' : `Refund $${refundAmount.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefundModal;