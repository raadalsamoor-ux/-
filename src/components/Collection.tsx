import React, { useState, useMemo } from 'react';
import { Eye, Search, Wand2, ArrowLeft } from 'lucide-react';
import { DesignItem, WedLinkData } from '../data/wedlinkData';

interface CollectionProps {
  data: WedLinkData;
  onPreviewDesign: (design: DesignItem) => void;
  onOrderDesign: (design: DesignItem) => void;
  onBuildDesign?: (design: DesignItem) => void;
}

export const Collection: React.FC<CollectionProps> = ({
  data,
  onPreviewDesign,
  onOrderDesign,
  onBuildDesign,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Categories count
  const counts = useMemo(() => {
    return {
      all: data.designs.length,
      wedding: data.designs.filter(d => d.cat === 'wedding').length,
      henna: data.designs.filter(d => d.cat === 'henna').length,
      grad: data.designs.filter(d => d.cat === 'grad').length,
    };
  }, [data.designs]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    data.designs.forEach(d => {
      d.tags.forEach(t => set.add(t));
    });
    return Array.from(set);
  }, [data.designs]);

  // Filtered designs
  const filteredDesigns = useMemo(() => {
    return data.designs.filter(d => {
      // Category filter
      if (selectedCat !== 'all' && d.cat !== selectedCat) {
        return false;
      }
      // Tag filter
      if (selectedTag && !d.tags.includes(selectedTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = d.name.toLowerCase().includes(q);
        const matchLatin = d.latin.toLowerCase().includes(q);
        const matchTag = d.tags.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchLatin && !matchTag) {
          return false;
        }
      }
      return true;
    });
  }, [data.designs, selectedCat, selectedTag, searchQuery]);

  return (
    <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#F1EEE7] border-t border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B08D57]/30 text-[#24211D] mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span className="text-xs font-serif font-semibold text-[#24211D]">المجموعة المعتمدة الفاخرة</span>
          </div>

          <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-[#24211D] mb-3">
            {data.collection.title}
          </h2>
          <p className="text-sm sm:text-base text-[#716B62] leading-relaxed">
            {data.collection.sub}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white p-3.5 sm:p-4 rounded-xl border border-[#E6E1D8] shadow-2xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            <button
              onClick={() => { setSelectedCat('all'); setSelectedTag(null); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCat === 'all'
                  ? 'bg-[#29251F] text-white'
                  : 'bg-[#F8F6F1] text-[#24211D] hover:bg-[#E6E1D8]'
              }`}
            >
              الكل ({counts.all})
            </button>
            <button
              onClick={() => { setSelectedCat('wedding'); setSelectedTag(null); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCat === 'wedding'
                  ? 'bg-[#29251F] text-white'
                  : 'bg-[#F8F6F1] text-[#24211D] hover:bg-[#E6E1D8]'
              }`}
            >
              أعراس ({counts.wedding})
            </button>
            <button
              onClick={() => { setSelectedCat('henna'); setSelectedTag(null); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCat === 'henna'
                  ? 'bg-[#29251F] text-white'
                  : 'bg-[#F8F6F1] text-[#24211D] hover:bg-[#E6E1D8]'
              }`}
            >
              حنّاء ({counts.henna})
            </button>
            <button
              onClick={() => { setSelectedCat('grad'); setSelectedTag(null); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCat === 'grad'
                  ? 'bg-[#29251F] text-white'
                  : 'bg-[#F8F6F1] text-[#24211D] hover:bg-[#E6E1D8]'
              }`}
            >
              تخرّج ({counts.grad})
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#716B62] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم التصميم أو الطابع..."
              className="w-full bg-[#F8F6F1] text-xs sm:text-sm text-[#24211D] pr-9 pl-3 py-2 rounded-lg border border-[#E6E1D8] focus:border-[#B08D57] focus:outline-none placeholder-[#716B62]"
            />
          </div>
        </div>

        {/* Feature Tags Quick Filter */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-8 text-xs text-[#716B62] no-scrollbar">
          <span className="shrink-0 text-[#24211D] font-medium pl-1">المزايا والأنماط:</span>
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`shrink-0 px-3 py-1 rounded-md border transition-colors ${
                  isSelected
                    ? 'bg-[#B08D57] text-white border-[#B08D57]'
                    : 'bg-white text-[#716B62] border-[#E6E1D8] hover:border-[#B08D57] hover:text-[#24211D]'
                }`}
              >
                {tag}
              </button>
            );
          })}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="shrink-0 text-[11px] text-[#B08D57] underline hover:text-[#29251F]"
            >
              إلغاء التصفية
            </button>
          )}
        </div>

        {/* Designs Grid */}
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E6E1D8] p-6">
            <p className="text-[#716B62] text-sm">لا توجد تصاميم مطابقة لبحثك في هذا القسم.</p>
            <button
              onClick={() => { setSelectedCat('all'); setSelectedTag(null); setSearchQuery(''); }}
              className="mt-3 text-xs text-[#B08D57] font-semibold underline hover:text-[#29251F]"
            >
              عرض جميع التصاميم
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDesigns.map((design) => {
              return (
                <div
                  key={design.slug}
                  id={`design-card-${design.slug}`}
                  className="bg-white rounded-xl border border-[#E6E1D8] overflow-hidden shadow-sm hover:shadow-md transition-all duration-250 flex flex-col group"
                >
                  {/* Image Card Frame */}
                  <div
                    className="relative aspect-[9/14] overflow-hidden cursor-pointer bg-[#F8F6F1]"
                    onClick={() => onPreviewDesign(design)}
                  >
                    <img
                      src={design.thumb}
                      alt={design.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/70 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md bg-white text-[#24211D] border border-[#E6E1D8] shadow-2xs">
                        {design.cat === 'wedding' ? 'زفاف مبارك' : design.cat === 'henna' ? 'ليلة حنّاء' : 'حفل تخرّج'}
                      </span>
                    </div>

                    {/* Quick Preview Hover Pill */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-[#24211D] text-xs font-semibold border border-[#E6E1D8] shadow-md">
                        <Eye className="w-3.5 h-3.5 text-[#B08D57]" />
                        <span>معاينة حية للمدعوين</span>
                      </span>
                    </div>

                    {/* Color palette swatches */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md border border-[#E6E1D8]">
                      {design.palette.map((color, cIdx) => (
                        <span
                          key={cIdx}
                          className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: color }}
                          title={`درجة اللون ${cIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Titles */}
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <h3 className="font-editorial font-bold text-lg text-[#24211D] group-hover:text-[#B08D57] transition-colors">
                          {design.name}
                        </h3>
                        <span className="text-[11px] text-[#716B62] font-serif tracking-wider uppercase font-medium">
                          {design.latin}
                        </span>
                      </div>

                      {/* Tag Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {design.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] px-2.5 py-0.5 rounded bg-[#F8F6F1] text-[#716B62] border border-[#E6E1D8]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="space-y-2 pt-3 border-t border-[#E6E1D8]">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onPreviewDesign(design)}
                          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium text-[#24211D] bg-white border border-[#E6E1D8] hover:bg-[#F8F6F1] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#716B62]" />
                          <span>معاينة حية</span>
                        </button>

                        <button
                          onClick={() => onBuildDesign ? onBuildDesign(design) : onOrderDesign(design)}
                          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#29251F] hover:bg-[#1A1814] active:scale-[0.98] transition-all border border-[#B08D57]/30"
                        >
                          <Wand2 className="w-3.5 h-3.5 text-[#D6BE91]" />
                          <span>صمّم فوراً</span>
                        </button>
                      </div>

                      <button
                        onClick={() => onOrderDesign(design)}
                        className="w-full text-center text-[11px] text-[#716B62] hover:text-[#24211D] transition-colors py-1 flex items-center justify-center gap-1"
                      >
                        <span>أو اطلب تخصيصاً خاصاً عبر واتساب</span>
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
