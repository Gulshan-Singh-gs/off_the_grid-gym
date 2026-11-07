'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  AlertCircle, 
  X, 
  ArrowUp, 
  ArrowDown, 
  ExternalLink 
} from 'lucide-react';
import { GalleryImage, GalleryCategory } from '@/types';
import { getGalleryImages, saveGalleryImages, deleteGalleryImage } from '@/lib/dataStore';
import { defaultGalleryImages } from '@/lib/defaultData';

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    title: '',
    category: 'strength',
    image_url: '',
    caption: '',
    is_active: true,
  });

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const data = await getGalleryImages(false);
    setImages(data.length > 0 ? data : defaultGalleryImages);
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleStartCreate = () => {
    setFormData({
      id: `gallery-${Date.now()}`,
      title: '',
      category: 'strength',
      image_url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
      caption: '',
      is_active: true,
      sort_order: images.length + 1,
    });
    setIsCreating(true);
    setEditingImage(null);
  };

  const handleStartEdit = (img: GalleryImage) => {
    setEditingImage(img);
    setFormData({ ...img });
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image_url) {
      showToast('error', 'Please provide an image title and photo URL.');
      return;
    }

    let updatedList: GalleryImage[];
    if (isCreating) {
      const newImg: GalleryImage = {
        id: formData.id || `gallery-${Date.now()}`,
        title: formData.title,
        category: (formData.category as GalleryCategory) || 'strength',
        image_url: formData.image_url,
        caption: formData.caption || undefined,
        is_active: Boolean(formData.is_active),
        sort_order: images.length + 1,
      };
      updatedList = [newImg, ...images];
    } else if (editingImage) {
      updatedList = images.map((img) =>
        img.id === editingImage.id ? ({ ...img, ...formData } as GalleryImage) : img
      );
    } else {
      return;
    }

    const success = await saveGalleryImages(updatedList);
    if (success) {
      setImages(updatedList);
      setIsCreating(false);
      setEditingImage(null);
      showToast('success', 'Gallery image saved successfully!');
    } else {
      showToast('error', 'Failed to save gallery image.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    const success = await deleteGalleryImage(id);
    if (success) {
      setImages(images.filter((img) => img.id !== id));
      showToast('success', 'Image removed from gallery.');
    } else {
      showToast('error', 'Failed to delete image.');
    }
  };

  const handleToggleActive = async (image: GalleryImage) => {
    const updated = images.map((img) =>
      img.id === image.id ? { ...img, is_active: !img.is_active } : img
    );
    await saveGalleryImages(updated);
    setImages(updated);
    showToast(
      'success',
      `Image is now ${!image.is_active ? 'Visible' : 'Hidden'} in public gallery.`
    );
  };

  const handleMoveOrder = async (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;

    const copy = [...images];
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;

    const reordered = copy.map((img, i) => ({ ...img, sort_order: i + 1 }));
    setImages(reordered);
    await saveGalleryImages(reordered);
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Gym Gallery & Media Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Upload and organize gym interior, equipment, and workout environment photos shown in the public gallery.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#05e05d] transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo to Gallery</span>
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

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div
            key={img.id}
            className={`rounded-2xl overflow-hidden bg-[#0e1117] border flex flex-col justify-between transition-all ${
              img.is_active ? 'border-white/10' : 'border-red-500/30 opacity-60'
            }`}
          >
            <div>
              {/* Photo preview */}
              <div className="relative h-52 w-full overflow-hidden bg-[#151922]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover object-center"
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
                    disabled={idx === images.length - 1}
                    onClick={() => handleMoveOrder(idx, 'down')}
                    className="p-0.5 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 rounded text-[9px] font-black uppercase text-black bg-[#00ff66]">
                    {img.category}
                  </span>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-white uppercase truncate">
                  {img.title}
                </h3>
                {img.caption && (
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {img.caption}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-4 pt-2 border-t border-white/5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleActive(img)}
                className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                  img.is_active
                    ? 'bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30'
                    : 'bg-red-500/10 text-red-400 border border-red-500/30'
                }`}
              >
                {img.is_active ? 'Active' : 'Hidden'}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStartEdit(img)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10"
                  title="Edit details"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(img.id, img.title)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                  title="Delete image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Modal */}
      {(isCreating || editingImage) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-xl w-full bg-[#0e1117] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wide">
                {isCreating ? 'Add Photo to Gallery' : 'Edit Photo Details'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingImage(null);
                }}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavy Dumbbell & Free Weights Deck"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category || 'strength'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as GalleryCategory,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                >
                  <option value="freeweights">Free Weights & Dumbbells</option>
                  <option value="strength">Strength & Machine Stations</option>
                  <option value="cardio">Cardio Deck</option>
                  <option value="ambience">Gym Ambience & Lighting</option>
                  <option value="community">Turf & Community</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Photo URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://... or Supabase Storage image link"
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Caption / Description (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the equipment or training area shown."
                  value={formData.caption || ''}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
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
                  <span>Show in Public Gallery (Active)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingImage(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#05e05d]"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

