import React, { useState, useEffect } from 'react';

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: 'student@example',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dob: '',
    companyName: '',
    resume: null,
    rounds: [{ title: '', description: '' }],
    experienceYears: 0
  });

  const [companies] = useState([
    'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 
    'Netflix', 'Tesla', 'Adobe', 'IBM', 'Oracle'
  ]);

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [resumePreview, setResumePreview] = useState(null);

  // Calculate password strength
  useEffect(() => {
    if (formData.password) {
      let strength = 0;
      
      if (formData.password.length >= 8) strength += 25;
      if (/[A-Z]/.test(formData.password)) strength += 25;
      if (/[0-9]/.test(formData.password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
      
      setPasswordStrength(strength);
      
      if (strength === 100) setPasswordFeedback('Strong');
      else if (strength >= 75) setPasswordFeedback('Medium');
      else if (strength >= 50) setPasswordFeedback('Weak');
      else setPasswordFeedback('Very Weak');
    } else {
      setPasswordStrength(0);
      setPasswordFeedback('');
    }
  }, [formData.password]);

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      resume: file
    });
    
    if (file) {
      setResumePreview(URL.createObjectURL(file));
    } else {
      setResumePreview(null);
    }
  };

  const removeResume = () => {
    setFormData({
      ...formData,
      resume: null
    });
    setResumePreview(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleRoundChange = (index, field, value) => {
    const newRounds = [...formData.rounds];
    newRounds[index][field] = value;
    setFormData({
      ...formData,
      rounds: newRounds
    });
  };

  const addRound = () => {
    setFormData({
      ...formData,
      rounds: [...formData.rounds, { title: '', description: '' }]
    });
  };

  const removeRound = (index) => {
    if (formData.rounds.length > 1) {
      const newRounds = formData.rounds.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        rounds: newRounds
      });
    }
  };

  const handleCompanySearch = (e) => {
    const value = e.target.value;
    handleInputChange(e);
    
    if (value.length > 0) {
      const filtered = companies.filter(company => 
        company.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]);
    }
  };

  const selectCompany = (company) => {
    setFormData({
      ...formData,
      companyName: company
    });
    setFilteredCompanies([]);
  };

  const getProgressPercentage = () => {
    return (step / 5) * 100;
  };

  const getDisplayText = () => {
    switch (step) {
      case 1: return  'Go ahead !';
      case 2: return formData.firstName || 'Personal Info';
      case 3: return `${formData.firstName} ${formData.lastName}` || 'Professional Info';
      case 4: return `${formData.firstName} ${formData.lastName}` || 'Interview Experience';
      case 5: return 'Review & Submit';
      default: return '';
    }
  };

  // Animation classes for steps
  const getAnimationClass = (currentStep) => {
    if (currentStep === step) return 'opacity-100 translate-x-0';
    if (currentStep < step) return 'absolute opacity-0 -translate-x-full';
    return 'absolute opacity-0 translate-x-full';
  };

  // Step titles for progress bar
  const stepTitles = [
    'Account',
    'Personal',
    'Professional',
    'Experience',
    'Review'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Enhanced Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-800">
              {getDisplayText()}
            </h2>
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Step {step} of 5
            </span>
          </div>
          
          {/* Progress Track */}
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-2">
              {stepTitles.map((title, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center flex-1 ${index < stepTitles.length - 1 ? 'mr-2' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 z-10 transition-all duration-300 ${
                    index + 1 <= step 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    index + 1 <= step ? 'text-indigo-700 font-semibold' : 'text-gray-500'
                  }`}>
                    {title}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Progress Line */}
            <div className="overflow-hidden h-2 rounded-full bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
          <div className="p-6 md:p-8">
            {/* Step 1: Password (Email visible at top) */}
            <div className={`transition-all duration-300 ease-in-out transform ${getAnimationClass(1)}`}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Account Email</p>
                        <p className="font-medium text-gray-800">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Create Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Enter a strong password"
                    />
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Password Strength</span>
                          <span className={`font-medium ${
                            passwordStrength === 100 ? 'text-green-600' :
                            passwordStrength >= 75 ? 'text-blue-600' :
                            passwordStrength >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {passwordFeedback}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              passwordStrength === 100 ? 'bg-green-500' :
                              passwordStrength >= 75 ? 'bg-blue-500' :
                              passwordStrength >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                        {passwordStrength < 100 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {passwordStrength < 50 ? 'Add uppercase, number, and special character' : 'Good, but can be stronger'}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Re-enter your password"
                    />
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={nextStep}
                      disabled={!formData.password || formData.password !== formData.confirmPassword || passwordStrength < 75}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Personal Info */}
            <div className={`transition-all duration-300 ease-in-out transform ${getAnimationClass(2)}`}>
              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Account Email</p>
                        <p className="font-medium text-gray-800">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Your first name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!formData.firstName || !formData.lastName || !formData.dob}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Professional Info */}
            <div className={`transition-all duration-300 ease-in-out transform ${getAnimationClass(3)}`}>
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Professional Details</h3>
                    <p className="text-gray-600 mt-1">Tell us about your current role</p>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleCompanySearch}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Search or select company"
                    />
                    
                    {filteredCompanies.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredCompanies.slice(0, 5).map((company, index) => (
                          <div
                            key={index}
                            onClick={() => selectCompany(company)}
                            className="px-4 py-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            {company}
                          </div>
                        ))}
                      </div>
                    )}
                    
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Resume
                    </label>
                    
                    {!formData.resume ? (
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
                          </div>
                          <input 
                            type="file" 
                            onChange={handleFileChange}
                            className="hidden" 
                            accept=".pdf,.doc,.docx"
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{formData.resume.name}</p>
                            <p className="text-xs text-gray-500">{(formData.resume.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <div className="flex space-x-2">
                            {resumePreview && (
                              <button 
                                onClick={() => window.open(resumePreview, '_blank')}
                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                              >
                                Preview
                              </button>
                            )}
                            <button 
                              onClick={removeResume}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!formData.companyName || !formData.resume}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 4: Interview Experience */}
            <div className={`transition-all duration-300 ease-in-out transform ${getAnimationClass(4)}`}>
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Interview Experience</h3>
                    <p className="text-gray-600 mt-1">Share details about your interview process</p>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-4">
                      Interview Rounds
                    </label>
                    
                    {formData.rounds.map((round, index) => (
                      <div key={index} className="mb-5 p-5 border border-gray-200 rounded-xl bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-gray-700">Round {index + 1}</h3>
                          {formData.rounds.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeRound(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Round Title
                          </label>
                          <input
                            type="text"
                            value={round.title}
                            onChange={(e) => handleRoundChange(index, 'title', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder="e.g., Technical Interview"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={round.description}
                            onChange={(e) => handleRoundChange(index, 'description', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder="Describe the interview process, questions asked, etc."
                            rows="3"
                          />
                        </div>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addRound}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Another Round
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        name="experienceYears"
                        min="0"
                        max="30"
                        value={formData.experienceYears}
                        onChange={handleInputChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span className="font-medium text-indigo-600">{formData.experienceYears} years</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 5: Review/Complete */}
            <div className={`transition-all duration-300 ease-in-out transform ${getAnimationClass(5)}`}>
              {step === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Review Your Information</h3>
                    <p className="text-gray-600 mt-1">Please verify all details before submitting</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Account Email</p>
                        <p className="font-medium text-gray-800">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="border-b border-gray-200 pb-5">
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Name:</span> 
                          <span className="ml-2">{formData.firstName} {formData.lastName}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Date of Birth:</span> 
                          <span className="ml-2">{formData.dob}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-5">
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Professional Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Company:</span> 
                          <span className="ml-2">{formData.companyName}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Experience:</span> 
                          <span className="ml-2">{formData.experienceYears} years</span>
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Interview Rounds
                      </h3>
                      <div className="space-y-4">
                        {formData.rounds.map((round, index) => (
                          <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg">
                            <h4 className="font-bold text-gray-700">{round.title}</h4>
                            <p className="text-sm text-gray-600 mt-2">{round.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-6">
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => console.log('Form submitted:', formData)}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Complete Registration
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2023 Campus Connect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Form;