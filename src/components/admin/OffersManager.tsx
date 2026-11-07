'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Tag, 
  Calendar, 
  Check, 
  AlertCircle, 
  X,
  Clock
} from 'lucide-react';
import { PromotionalOffer } from '@/types';
import { getPromotionalOffers, savePromotionalOffers, deletePromotionalOffer, formatDisplayDate } from '@/lib/dataStore';
import { defaultPromotionalOffers } from '@/lib/defaultData';

export default function OffersManager() {
  const [offers, setOffers] = useState<PromotionalOffer[]>([]);
  const [editingOffer, setEditingOffer] = useState<PromotionalOffer | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [todayStr, setTodayStr] = useState('2026-01-01');

  const [formData, setFormData] = useState<Partial<PromotionalOffer>>({
    title: '',
    badge: 'LIMITED TIME OFFER',
    description: '',
    discount_text: 'SAVE ₹1,000',
    promo_code: '',
    applicable_plan: 'Quarterly & Annual Memberships',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    is_active: true,
  });

  useEffect(() => {
    setTodayStr(new Date().toISOString().split('T')[0]);
    loadOffers();
  }, []);

  const loadOffers = async () => {
    const data = await getPromotionalOffers(false);
    setOffers(data.length > 0 ? data : defaultPromotionalOffers);
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleStartCreate = () => {
    setFormData({
      id: `offer-${Date.now()}`,
      title: '',
      badge: 'LIMITED TIME OFFER',
      description: '',
      discount_text: 'FLAT ₹1,000 OFF',
      promo_code: 'OTGNEW',
      applicable_plan: 'Quarterly & Annual Plans',
      valid_from: new Date().toISOString().split('T')[0],
      valid_until: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      is_active: true,
    });
    setIsCreating(true);
    setEditingOffer(null);
  };

  const handleStartEdit = (offer: PromotionalOffer) => {
    setEditingOffer(offer);
    setFormData({ ...offer });
    setIsCreating(false);
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.discount_text || !formData.valid_until) {
      showToast('error', 'Please fill in the title, discount value, and validity date.');
      return;
    }

    let updatedList: PromotionalOffer[];
    if (isCreating) {
      const newOffer: PromotionalOffer = {
        id: formData.id || `offer-${Date.now()}`,
        title: formData.title,
        badge: formData.badge || 'LIMITED OFFER',
        description: formData.description || '',
        discount_text: formData.discount_text,
        promo_code: formData.promo_code || undefined,
        applicable_plan: formData.applicable_plan || undefined,
        valid_from: formData.valid_from || new Date().toISOString().split('T')[0],
        valid_until: formData.valid_until,
        is_active: Boolean(formData.is_active),
      };
      updatedList = [newOffer, ...offers];
    } else if (editingOffer) {
      updatedList = offers.map((o) =>
        o.id === editingOffer.id ? ({ ...o, ...formData } as PromotionalOffer) : o
      );
    } else {
      return;
    }

    const success = await savePromotionalOffers(updatedList);
    if (success) {
      setOffers(updatedList);
      setIsCreating(false);
      setEditingOffer(null);
      showToast('success', 'Promotional offer successfully saved!');
    } else {
      showToast('error', 'Could not save promotional offer.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete offer "${title}"?`)) return;
    const success = await deletePromotionalOffer(id);
    if (success) {
      setOffers(offers.filter((o) => o.id !== id));
      showToast('success', 'Offer deleted successfully.');
    } else {
      showToast('error', 'Could not delete offer.');
    }
  };

  const handleToggleActive = async (offer: PromotionalOffer) => {
    const updated = offers.map((o) =>
      o.id === offer.id ? { ...o, is_active: !o.is_active } : o
    );
    await savePromotionalOffers(updated);
    setOffers(updated);
    showToast(
      'success',
      `Offer is now ${!offer.is_active ? 'Active' : 'Disabled (Hidden)'}.`
    );
  };


  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Promotional Offers Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Create seasonal discounts and promotional banners. Expired offers are hidden automatically from public visitors.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#05e05d] transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-[#00ff66]/10 border-[#00ff66]/40 text-[#00ff66]'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {feedback.type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => {
          const isExpired = offer.valid_until < todayStr;

          return (
            <div
              key={offer.id}
              className={`rounded-2xl p-6 bg-[#0e1117] border flex flex-col justify-between transition-all ${
                isExpired
                  ? 'border-yellow-500/30 opacity-60'
                  : offer.is_active
                  ? 'border-white/10'
                  : 'border-red-500/30 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase text-black bg-[#00ff66]">
                    {offer.badge}
                  </span>
                  {isExpired ? (
                    <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Expired
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-gray-400">
                      {offer.applicable_plan || 'All Plans'}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-white uppercase tracking-wide">
                  {offer.title}
                </h3>

                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {offer.description}
                </p>

                <div className="my-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Discount:</span>
                    <span className="font-bold text-[#00ff66]">{offer.discount_text}</span>
                  </div>
                  {offer.promo_code && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Promo Code:</span>
                      <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                        {offer.promo_code}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Valid Through:</span>
                    <span className="font-semibold text-gray-300">
                      {formatDisplayDate(offer.valid_until)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggleActive(offer)}
                  className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                    offer.is_active && !isExpired
                      ? 'bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}
                >
                  {offer.is_active ? 'Active' : 'Disabled'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(offer)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10"
                    title="Edit Offer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(offer.id, offer.title)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                    title="Delete Offer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Offer Form Modal */}
      {(isCreating || editingOffer) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-xl w-full bg-[#0e1117] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wide">
                {isCreating ? 'Create Promotional Offer' : 'Edit Promotional Offer'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingOffer(null);
                }}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New Year Fitness Drive: Flat ₹1,000 Off"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. LIMITED OFFER / BUDDY DEAL"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Discount Text *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SAVE ₹1,000 INSTANTLY"
                    value={formData.discount_text || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, discount_text: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. OTGROPAR1000"
                    value={formData.promo_code || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, promo_code: e.target.value.toUpperCase() })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Applicable Plan
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3-Month & 12-Month Plans"
                    value={formData.applicable_plan || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, applicable_plan: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Valid From Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.valid_from || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, valid_from: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Valid Until Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.valid_until || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, valid_until: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Promotional Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain terms, what is included, and how prospective members can claim this offer."
                  value={formData.description || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.is_active !== false}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#00ff66]"
                  />
                  <span>Publish Offer (Active on Website)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingOffer(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#05e05d]"
                >
                  Save Promotional Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
