'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Sparkles, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  AlertCircle 
} from 'lucide-react';
import { MembershipPlan } from '@/types';
import { getMembershipPlans, saveMembershipPlans, deleteMembershipPlan } from '@/lib/dataStore';
import { defaultMembershipPlans } from '@/lib/defaultData';

export default function PricingManager() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states for modal/editor
  const [formData, setFormData] = useState<Partial<MembershipPlan>>({
    name: '',
    duration_label: '1 Month',
    duration_months: 1,
    price_inr: 1500,
    original_price_inr: undefined,
    badge: '',
    description: '',
    features: ['Full Gym Floor Access', 'Locker Usage', 'Trainer Guidance'],
    is_popular: false,
    is_active: true,
  });

  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const data = await getMembershipPlans(false);
    setPlans(data.length > 0 ? data : defaultMembershipPlans);
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleStartCreate = () => {
    setFormData({
      id: `plan-${Date.now()}`,
      name: '',
      duration_label: '1 Month',
      duration_months: 1,
      price_inr: 1500,
      original_price_inr: undefined,
      badge: '',
      description: '',
      features: ['Full Gym Floor Access', 'Locker Room Usage', 'General Trainer Guidance'],
      is_popular: false,
      is_active: true,
      sort_order: plans.length + 1,
    });
    setIsCreating(true);
    setEditingPlan(null);
  };

  const handleStartEdit = (plan: MembershipPlan) => {
    setEditingPlan(plan);
    setFormData({ ...plan });
    setIsCreating(false);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), featureInput.trim()],
    }));
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== idx),
    }));
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price_inr) {
      showToast('error', 'Please provide a plan name and price in INR.');
      return;
    }

    let updatedList: MembershipPlan[];
    if (isCreating) {
      const newPlan: MembershipPlan = {
        id: formData.id || `plan-${Date.now()}`,
        name: formData.name,
        duration_label: formData.duration_label || '1 Month',
        duration_months: Number(formData.duration_months) || 1,
        price_inr: Number(formData.price_inr),
        original_price_inr: formData.original_price_inr ? Number(formData.original_price_inr) : undefined,
        badge: formData.badge || undefined,
        description: formData.description || '',
        features: formData.features && formData.features.length > 0 ? formData.features : ['Full Floor Access'],
        is_popular: Boolean(formData.is_popular),
        is_active: Boolean(formData.is_active),
        sort_order: plans.length + 1,
      };
      updatedList = [...plans, newPlan];
    } else if (editingPlan) {
      updatedList = plans.map((p) =>
        p.id === editingPlan.id
          ? ({ ...p, ...formData } as MembershipPlan)
          : p
      );
    } else {
      return;
    }

    const success = await saveMembershipPlans(updatedList);
    if (success) {
      setPlans(updatedList);
      setIsCreating(false);
      setEditingPlan(null);
      showToast('success', 'Membership pricing successfully saved and updated on public website!');
    } else {
      showToast('error', 'Failed to save changes. Please try again.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the plan "${name}"?`)) return;
    const success = await deleteMembershipPlan(id);
    if (success) {
      const filtered = plans.filter((p) => p.id !== id);
      setPlans(filtered);
      showToast('success', `Plan "${name}" removed successfully.`);
    } else {
      showToast('error', 'Could not delete plan.');
    }
  };

  const handleToggleActive = async (plan: MembershipPlan) => {
    const updated = plans.map((p) =>
      p.id === plan.id ? { ...p, is_active: !p.is_active } : p
    );
    await saveMembershipPlans(updated);
    setPlans(updated);
    showToast(
      'success',
      `Plan is now ${!plan.is_active ? 'Visible (Active)' : 'Hidden (Inactive)'} on website.`
    );
  };

  const handleMoveOrder = async (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= plans.length) return;

    const copy = [...plans];
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;

    // re-assign sort_order
    const reordered = copy.map((p, i) => ({ ...p, sort_order: i + 1 }));
    setPlans(reordered);
    await saveMembershipPlans(reordered);
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Membership Pricing Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Add or edit membership tiers, change prices, reorder cards, and toggle plan visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#05e05d] transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Plan</span>
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

      {/* Plans List Table/Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            className={`rounded-2xl p-6 bg-[#0e1117] border transition-all flex flex-col justify-between ${
              plan.is_active ? 'border-white/10' : 'border-red-500/30 opacity-60'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400">
                  Position #{idx + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveOrder(idx, 'up')}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                    title="Move card left/up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === plans.length - 1}
                    onClick={() => handleMoveOrder(idx, 'down')}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                    title="Move card right/down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-black text-white uppercase tracking-wide">
                  {plan.name}
                </h3>
                {plan.badge && (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/40">
                    {plan.badge}
                  </span>
                )}
              </div>

              <div className="my-3 pb-3 border-b border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-[#00ff66]">₹</span>
                  <span className="text-3xl font-black text-white">
                    {plan.price_inr.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-400">/ {plan.duration_label}</span>
                </div>
                {plan.original_price_inr && (
                  <span className="text-[11px] text-gray-500 line-through">
                    Was ₹{plan.original_price_inr.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 mb-4">{plan.description}</p>

              {/* Features summary */}
              <div className="text-[11px] text-gray-300 space-y-1 mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Included Features ({plan.features.length}):
                </span>
                {plan.features.slice(0, 3).map((f, i) => (
                  <div key={i} className="truncate text-gray-400">
                    • {f}
                  </div>
                ))}
                {plan.features.length > 3 && (
                  <span className="text-[10px] text-[#00ff66]">
                    +{plan.features.length - 3} more...
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleToggleActive(plan)}
                className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                  plan.is_active
                    ? 'bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30'
                    : 'bg-red-500/10 text-red-400 border border-red-500/30'
                }`}
              >
                {plan.is_active ? 'Active' : 'Hidden'}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStartEdit(plan)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10"
                  title="Edit Plan"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(plan.id, plan.name)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                  title="Delete Plan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Form Modal */}
      {(isCreating || editingPlan) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-xl w-full bg-[#0e1117] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wide">
                {isCreating ? 'Create Membership Plan' : `Edit: ${editingPlan?.name}`}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingPlan(null);
                }}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Plan Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3 Months Transformation"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="4200"
                    value={formData.price_inr || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, price_inr: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Original Price (Optional Strike-through)
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="4800"
                    value={formData.original_price_inr || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        original_price_inr: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Duration Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 Months"
                    value={formData.duration_label || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, duration_label: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Duration (Months)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.duration_months || 1}
                    onChange={(e) =>
                      setFormData({ ...formData, duration_months: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Highlight Badge (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. MOST POPULAR / BEST VALUE"
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the package"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              {/* Features List builder */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Included Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type feature & click add (e.g. Free Nutrition Plan)"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00ff66]"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {(formData.features || []).map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-300"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.is_popular || false}
                    onChange={(e) =>
                      setFormData({ ...formData, is_popular: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#00ff66]"
                  />
                  <span>Mark as Most Popular (Highlighted Card)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.is_active !== false}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#00ff66]"
                  />
                  <span>Publish / Active</span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingPlan(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#05e05d]"
                >
                  Save Membership Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

