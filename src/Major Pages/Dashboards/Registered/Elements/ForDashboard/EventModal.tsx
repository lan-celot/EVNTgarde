import React, { useState } from "react";
import { Pencil, Plus, X, Check } from "lucide-react";

interface IncludedItem {
  section: string;
  bullets: string[];
}

interface EventModalProps {
  title: string;
  intro: string;
  fullDetails: string;
  included: IncludedItem[];
  price: string;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  title,
  intro,
  fullDetails,
  included,
  price,
  onClose,
}) => {
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableIntro, setEditableIntro] = useState(intro);
  const [editableFullDetails, setEditableFullDetails] = useState(fullDetails);
  const [editableIncluded, setEditableIncluded] = useState(included);
  const [editablePrice, setEditablePrice] = useState(price);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingIntro, setIsEditingIntro] = useState(false);
  const [isEditingFullDetails, setIsEditingFullDetails] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [editingSectionIdx, setEditingSectionIdx] = useState<number | null>(null);
  const [editingBulletIdx, setEditingBulletIdx] = useState<{ section: number; bullet: number } | null>(null);

  const handleSectionChange = (sectionIdx: number, newValue: string) => {
    const updated = [...editableIncluded];
    updated[sectionIdx].section = newValue;
    setEditableIncluded(updated);
  };

  const handleBulletChange = (sectionIdx: number, bulletIdx: number, newValue: string) => {
    const updated = [...editableIncluded];
    updated[sectionIdx].bullets[bulletIdx] = newValue;
    setEditableIncluded(updated);
  };

  const handleAddBullet = (sectionIdx: number) => {
    const updated = [...editableIncluded];
    updated[sectionIdx].bullets.push("New bullet");
    setEditableIncluded(updated);
  };

  const handleDeleteBullet = (sectionIdx: number, bulletIdx: number) => {
    const updated = [...editableIncluded];
    updated[sectionIdx].bullets.splice(bulletIdx, 1);
    setEditableIncluded(updated);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border p-8 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* Title */}
        <div className="flex items-center mb-4 group">
          {isEditingTitle ? (
            <>
              <input
                type="text"
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                className="w-full border rounded p-2 text-2xl font-bold"
              />
              <button
                className="ml-2 text-green-600"
                onClick={() => setIsEditingTitle(false)}
              >
                <Check size={16} />
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold">{editableTitle}</h2>
              <button
                className="ml-2 hidden group-hover:inline text-blue-600"
                onClick={() => setIsEditingTitle(true)}
              >
                <Pencil size={16} />
              </button>
            </>
          )}
        </div>

        {/* Intro */}
        <div className="flex items-center mb-4 group">
          {isEditingIntro ? (
            <>
              <textarea
                value={editableIntro}
                onChange={(e) => setEditableIntro(e.target.value)}
                className="w-full border rounded p-2"
                rows={2}
              />
              <button
                className="ml-2 text-green-600"
                onClick={() => setIsEditingIntro(false)}
              >
                <Check size={16} />
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-700">{editableIntro}</p>
              <button
                className="ml-2 hidden group-hover:inline text-blue-600"
                onClick={() => setIsEditingIntro(true)}
              >
                <Pencil size={16} />
              </button>
            </>
          )}
        </div>

        {/* Full Details */}
        <div className="flex items-center mb-6 group">
          {isEditingFullDetails ? (
            <>
              <textarea
                value={editableFullDetails}
                onChange={(e) => setEditableFullDetails(e.target.value)}
                className="w-full border rounded p-2"
                rows={3}
              />
              <button
                className="ml-2 text-green-600"
                onClick={() => setIsEditingFullDetails(false)}
              >
                <Check size={16} />
              </button>
            </>
          ) : (
            <>
              <p className="italic text-gray-600">{editableFullDetails}</p>
              <button
                className="ml-2 hidden group-hover:inline text-blue-600"
                onClick={() => setIsEditingFullDetails(true)}
              >
                <Pencil size={16} />
              </button>
            </>
          )}
        </div>

        {/* What's Included */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">What's included:</h3>
          {editableIncluded.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-6">
              <div className="flex items-center group">
                {editingSectionIdx === sectionIdx ? (
                  <>
                    <input
                      type="text"
                      value={section.section}
                      onChange={(e) => handleSectionChange(sectionIdx, e.target.value)}
                      className="w-full border rounded p-2 font-bold"
                    />
                    <button
                      className="ml-2 text-green-600"
                      onClick={() => setEditingSectionIdx(null)}
                    >
                      <Check size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="font-bold">{section.section}</h4>
                    <button
                      className="ml-2 hidden group-hover:inline text-blue-600"
                      onClick={() => setEditingSectionIdx(sectionIdx)}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className="ml-2 hidden group-hover:inline text-blue-600"
                      onClick={() => handleAddBullet(sectionIdx)}
                    >
                      <Plus size={14} />
                    </button>
                  </>
                )}
              </div>

              <ul className="list-disc pl-5 mt-2 space-y-2">
                {section.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="flex items-center group">
                    {editingBulletIdx?.section === sectionIdx && editingBulletIdx?.bullet === bulletIdx ? (
                      <>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleBulletChange(sectionIdx, bulletIdx, e.target.value)}
                          className="border rounded p-1 w-full"
                        />
                        <button
                          className="ml-2 text-green-600"
                          onClick={() => setEditingBulletIdx(null)}
                        >
                          <Check size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{bullet}</span>
                        <button
                          className="ml-2 hidden group-hover:inline text-blue-600"
                          onClick={() =>
                            setEditingBulletIdx({ section: sectionIdx, bullet: bulletIdx })
                          }
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          className="ml-2 hidden group-hover:inline text-blue-600"
                          onClick={() => handleDeleteBullet(sectionIdx, bulletIdx)}
                        >
                          <X size={12} />
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-2">Pricing</h3>
          <div className="flex items-center group">
            {isEditingPrice ? (
              <>
                <input
                  type="text"
                  value={editablePrice}
                  onChange={(e) => setEditablePrice(e.target.value)}
                  className="border rounded p-2 w-full font-bold text-blue-700"
                />
                <button
                  className="ml-2 text-green-600"
                  onClick={() => setIsEditingPrice(false)}
                >
                  <Check size={16} />
                </button>
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-blue-700">{editablePrice}</p>
                <button
                  className="ml-2 hidden group-hover:inline text-blue-600"
                  onClick={() => setIsEditingPrice(true)}
                >
                  <Pencil size={16} />
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventModal;
