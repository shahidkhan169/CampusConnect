// src/Components/modals/AddCompanyModal.js

import React, { useState } from 'react';

const AddCompanyModal = ({ isOpen, onClose, onCompanyAdded }) => {
  const [companyName, setCompanyName] = useState('');
  const [form, setForm] = useState({ image: '', contentType: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({
        image: reader.result,
        contentType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!companyName || !form.image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      companyName: companyName,
      companyImg: {
        data: form.image,
        contentType: form.contentType,
      },
    };

    try {
      const res = await fetch('http://localhost:9090/api/admin/addCompany', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Company added:', data);
        alert('🎉 Company added successfully!');
        onCompanyAdded?.(data); // Optional callback
        resetForm();
        onClose();
      } else {
        throw new Error(data.message || 'Failed to add company');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`❌ Failed to add company: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCompanyName('');
    setForm({ image: '', contentType: '' });
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <h3 className="text-2xl font-bold">Add New Company</h3>
          <p className="text-indigo-100 mt-1">Include logo and name to get started</p>

          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g., Google, Microsoft"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              disabled={isSubmitting}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isSubmitting}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-medium
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
                cursor-pointer"
            />
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP up to 5MB</p>
          </div>

          {/* Preview */}
          {form.image && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Logo Preview</p>
              <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                <img
                  src={form.image}
                  alt="Company logo preview"
                  className="w-full h-40 object-contain p-2"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Type: {form.contentType} • Size: Auto (Base64)
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-t-none rounded-b-xl border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 font-medium transition focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              'Add Company'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;