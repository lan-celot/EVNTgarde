import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";

const AttachedFiles: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleFileRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-60 ml-45 p-5 bg-white rounded-md shadow-md flex flex-col min-h-[400px]">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold">Attached Files</h2>
        <p className="text-sm text-gray-600 mb-3">
          Document and images provided by the customer
        </p>
      </div>

      {/* File List */}
      <div className="space-y-2 flex-grow">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 border rounded-md bg-gray-50"
            >
              <span className="truncate w-4/5">{file.name}</span>
              <button onClick={() => handleFileRemove(index)}>
                <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No files attached.</p>
        )}
      </div>

      {/* Upload Button at the Bottom */}
      <label className="mt-auto flex items-center justify-center gap-2 p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition">
        <Upload className="w-5 h-5" />
        <span className="text-sm font-medium">Upload File</span>
        <input
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          multiple
        />
      </label>
    </div>
  );
};

export default AttachedFiles;
