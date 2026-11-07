'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  AlertCircle, 
  X, 
  Award, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { Trainer } from '@/types';
import { getTrainers, saveTrainers, deleteTrainer } from '@/lib/dataStore';
import { defaultTrainers } from '@/lib/defaultData';

export default function TrainersManager() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState<Partial<Trainer>>({
    name: '',
    role: 'Strength & Conditioning Coach',
    experience_years: 3,
    bio: '',
    specializations: ['Hypertrophy', 'Fat Loss'],
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    is_active: true,
  });

  const [specInput, setSpecInput] = useState('');

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    const data = await getTrainers(false);
    setTrainers(data.length > 0 ? data : defaultTrainers);
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleStartCreate = () => {
    setFormData({
      id: `trainer-${Date.now()}`,
      name: '',
      role: 'Strength Coach',
      experience_years: 3,
      bio: '',
      specializations: ['Bodybuilding', 'Strength Training', 'Fat Loss'],
      image_url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
      is_active: true,
      sort_order: trainers.length + 1,
    });
    setIsCreating(true);
    setEditingTrainer(null);
  };

  const handleStartEdit = (t: Trainer) => {
    setEditingTrainer(t);
    setFormData({ ...t });
    setIsCreating(false);
  };

  const handleAddSpec = () => {
    if (!specInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      specializations: [...(prev.specializations || []), specInput.trim()],
    }));
    setSpecInput('');
  };

  const handleRemoveSpec = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      specializations: (prev.specializations || []).filter((_, i) => i !== idx),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      showToast('error', 'Please provide trainer name and role.');
      return;
    }

    let updatedList: Trainer[];
    if (isCreating) {
      const newTrainer: Trainer = {
        id: formData.id || `trainer-${Date.now()}`,
        name: formData.name,
        role: formData.role,
        experience_years: Number(formData.experience_years) || 1,
        bio: formData.bio || '',
        specializations:
          formData.specializations && formData.specializations.length > 0
            ? formData.specializations
            : ['Strength Coaching'],
        image_url:
          formData.image_url ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        is_active: Boolean(formData.is_active),
        sort_order: trainers.length + 1,
      };
      updatedList = [...trainers, newTrainer];
    } else if (editingTrainer) {
      updatedList = trainers.map((t) =>
        t.id === editingTrainer.id ? ({ ...t, ...formData } as Trainer) : t
      );
    } else {
      return;
    }

    const success = await saveTrainers(updatedList);
    if (success) {
      setTrainers(updatedList);
      setIsCreating(false);
      setEditingTrainer(null);
      showToast('success', 'Trainer profile successfully saved!');
    } else {
      showToast('error', 'Failed to save trainer profile.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete profile for "${name}"?`)) return;
    const success = await deleteTrainer(id);
    if (success) {
      setTrainers(trainers.filter((t) => t.id !== id));
      showToast('success', 'Trainer profile deleted.');
    } else {
      showToast('error', 'Failed to delete trainer.');
    }
  };

  const handleToggleActive = async (trainer: Trainer) => {
    const updated = trainers.map((t) =>
      t.id === trainer.id ? { ...t, is_active: !t.is_active } : t
    );
    await saveTrainers(updated);
    setTrainers(updated);
    showToast(
      'success',
      `Trainer is now ${!trainer.is_active ? 'Active' : 'Hidden'} on website.`
    );
  };

  const handleMoveOrder = async (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= trainers.length) return;

    const copy = [...trainers];
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;

    const reordered = copy.map((t, i) => ({ ...t, sort_order: i + 1 }));
    setTrainers(reordered);
    await saveTrainers(reordered);
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Trainer Profiles Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage certified coach profiles, photos, biographies, and specializations displayed to prospective members.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#05e05d] transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Trainer</span>
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

      {/* Trainers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainers.map((trainer, idx) => (
          <div
            key={trainer.id}
            className={`rounded-2xl overflow-hidden bg-[#0e1117] border flex flex-col justify-between transition-all ${
              trainer.is_active ? 'border-white/10' : 'border-red-500/30 opacity-60'
            }`}
          >
            <div>
              {/* Photo & Position */}
              <div className="relative h-56 w-full overflow-hidden bg-[#151922]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={trainer.image_url}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117] via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-gray-300 font-mono">
                  <span>#{idx + 1}</span>
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveOrder(idx, 'up')}
                    className="p-0.5 hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    disabled={idx === trainers.length - 1}
                    onClick={() => handleMoveOrder(idx, 'down')}
                    className="p-0.5 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 rounded text-[9px] font-black uppercase text-black bg-[#00ff66]">
                    {trainer.experience_years}+ Yrs
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <h3 className="text-lg font-black text-white uppercase tracking-wide">
                  {trainer.name}
                </h3>
                <p className="text-xs font-semibold text-[#00ff66] uppercase mt-0.5">
                  {trainer.role}
                </p>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                  {trainer.bio}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {trainer.specializations.map((s, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleActive(trainer)}
                className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                  trainer.is_active
                    ? 'bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30'
                    : 'bg-red-500/10 text-red-400 border border-red-500/30'
                }`}
              >
                {trainer.is_active ? 'Active' : 'Hidden'}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStartEdit(trainer)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10"
                  title="Edit Profile"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(trainer.id, trainer.name)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                  title="Delete Profile"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trainer Form Modal */}
      {(isCreating || editingTrainer) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-xl w-full bg-[#0e1117] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wide">
                {isCreating ? 'Add Trainer Profile' : `Edit: ${editingTrainer?.name}`}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingTrainer(null);
                }}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Trainer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Head Strength Coach"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Years Experience
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.experience_years || 1}
                    onChange={(e) =>
                      setFormData({ ...formData, experience_years: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Profile Photo URL
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Biography / Coaching Focus
                </label>
                <textarea
                  rows={3}
                  placeholder="Share certifications, lifting background, and coaching methodology."
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              {/* Specializations */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Specializations
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g. Bodybuilding, Powerlifting, HIIT"
                    value={specInput}
                    onChange={(e) => setSpecInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSpec();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00ff66]"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(formData.specializations || []).map((s, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs text-gray-300"
                    >
                      <span>{s}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(i)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
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
                  <span>Publish Trainer Profile (Active on Website)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingTrainer(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#05e05d]"
                >
                  Save Trainer Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

