import React, { useState } from 'react';
import axios from 'axios';

function AdminHome() {
  const [companyName, setCompanyName] = useState('');
  const [form, setForm] = useState({ image: '', contentType: '' });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          image: reader.result, // base64 string
          contentType: file.type, // e.g., image/jpeg
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!companyName || !form.image) {
      alert('Please fill in all fields.');
      return;
    }

    const payload = {
      companyName: companyName,
      companyImg: {
        data: form.image,
        contentType: form.contentType,
      },
    };

    try {
      const res = await axios.post('http://localhost:9090/api/admin/addCompany', payload);
      console.log('Upload successful:', res.data);
      alert('Company uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hi da (Admin Panel)</h1>

      {/* Company Name Input */}
      <div className="mb-4">
        <label className="block mb-1">Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter company name"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block mb-1">Upload Company Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 w-full"
        />
      </div>

      {/* Preview */}
      {form.image && (
        <div className="mb-4">
          <p className="mb-2">Preview:</p>
          <img
            src={form.image}
            alt="Uploaded Preview"
            className="h-48 border rounded object-contain"
          />
          <p className="text-sm mt-1 text-gray-500">Detected type: {form.contentType}</p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}

export default AdminHome;
