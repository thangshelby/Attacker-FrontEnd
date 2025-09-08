import React, { useState, useCallback, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { academic } from "@/apis/academic";
import {
  FileText,
  Award,
  Users,
  GraduationCap,
  Upload,
  X,
  Eye,
  Trash2,
  CheckCircle,
  Loader2,
} from "lucide-react";

interface SubmissionResult {
  gpa: number;
  credits: number;
  hasPersonalAchievement: boolean;
  hasSocialActivity: boolean;
  hasScholarship: boolean;
  transcriptCount: number;
  achievementCount: number;
  activityCount: number;
  scholarshipCount: number;
}

const DOCUMENT_TYPES = {
  transcript: {
    label: "Bảng điểm",
    icon: FileText,
    color: "indigo",
    step: 1,
    required: true, // Bắt buộc
  },
  personal_achievement: {
    label: "Thành tích cá nhân",
    icon: Award,
    color: "emerald",
    step: 2,
    required: false, // Có thể bỏ qua
  },
  social_activity: {
    label: "Hoạt động xã hội",
    icon: Users,
    color: "blue",
    step: 3,
    required: false, // Có thể bỏ qua
  },
  scholarship: {
    label: "Học bổng",
    icon: GraduationCap,
    color: "rose",
    step: 4,
    required: false, // Có thể bỏ qua
    canSkip: true, // Có thể bỏ qua luôn
  },
};

const DocumentUpload = ({
  documents = [],
  onDocumentsChange,
  documentType,
  onStepComplete,
  currentStep,
  onFinalSubmit,
  isLastStep,
  canSkip = false,
  onSkip,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});

  const config = DOCUMENT_TYPES[documentType];

  const addFiles = useCallback(
    (files) => {
      console.log(`📤 Trying to add files for documentType: ${documentType}`, files);
      
      const validFiles = Array.from(files).filter((file) => {
        const isValidType =
          file.type.startsWith("image/") || file.type === "application/pdf";
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

        if (!isValidType) {
          setErrors((prev) => ({
            ...prev,
            [file.name]: "Chỉ chấp nhận file PNG, JPG, JPEG, PDF",
          }));
        }
        if (!isValidSize) {
          setErrors((prev) => ({
            ...prev,
            [file.name]: "File quá lớn (tối đa 10MB)",
          }));
        }

        return isValidType && isValidSize;
      });

      console.log(`✅ Valid files count: ${validFiles.length}`);

      if (validFiles.length > 0) {
        const newDocuments = validFiles.map((file) => {
          const url = URL.createObjectURL(file);
          return {
            id: Date.now() + Math.random(),
            url: url,
            file: file,
            name: file.name,
            type: documentType,
          };
        });

        console.log(`📋 New documents created:`, newDocuments);
        onDocumentsChange([...documents, ...newDocuments]);
        setErrors({});
      }
    },
    [documents, documentType, onDocumentsChange]
  );

  const removeFile = useCallback(
    (fileId) => {
      const updatedDocuments = documents.filter((doc) => doc.id !== fileId);
      onDocumentsChange(updatedDocuments);
    },
    [documents, onDocumentsChange]
  );

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleChange = useCallback(
    (e) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        addFiles(e.target.files);
      }
    },
    [addFiles]
  );

  const handleStepComplete = () => {
    if (onStepComplete) {
      onStepComplete(documentType, documents);
    }
  };

  const handleSkipStep = () => {
    if (onSkip) {
      onSkip();
    }
  };



  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${config.color}-100 dark:bg-${config.color}-900`}
          >
            <config.icon
              className={`h-5 w-5 text-${config.color}-600 dark:text-${config.color}-400`}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Bước {config.step}: {config.label}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {documents.length} file đã upload
              {config.required && (
                <span className="ml-2 text-red-500">(Bắt buộc)</span>
              )}
            </p>
          </div>
        </div>


        
        {/* Debug info */}
        <div className="text-xs text-gray-500 mt-2">
          Debug: isLastStep={String(isLastStep)}, documents.length={documents.length}
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          dragActive
            ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
            : "border-gray-300 dark:border-gray-600"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={(input) => (input = input)}
          type="file"
          multiple
          accept="image/*,.pdf,application/pdf"
          onChange={handleChange}
          className="hidden"
        />

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
          <Upload className="h-8 w-8 text-gray-400" />
        </div>

        <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
          Kéo thả {config.label.toLowerCase()} vào đây hoặc nhấn để chọn
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          PNG, JPG, JPEG, PDF (tối đa 10MB mỗi file) - Có thể chọn nhiều file
          {config.required}
        </p>

        <button
          type="button"
          onClick={() => {
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
              fileInput.click();
            }
          }}
          className="mt-4 inline-flex items-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          + Thêm {config.label.toLowerCase()}
        </button>
      </div>

      {/* Uploaded Files */}
      {documents.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Files đã upload:
          </h4>
          {documents.map((document, index) => (
            <DocumentItem
              key={document.id}
              document={document}
              index={index}
              onRemove={removeFile}
              config={config}
            />
          ))}
        </div>
      )}

      {/* Error Messages */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <h4 className="mb-2 font-medium text-red-800 dark:text-red-200">
            Lỗi upload:
          </h4>
          <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
            {Object.entries(errors).map(([fileName, error]) => (
              <li key={fileName}>
                <strong>{fileName}:</strong> {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Status Info Only - No Buttons */}
      <div className="flex justify-center items-center pt-2">
        <div className="text-sm text-gray-500">
          {documents.length > 0 && (
            <span>✅ {documents.length} file đã upload</span>
          )}
          {config.required && documents.length === 0 && (
            <span className="text-orange-500">⚠️ Cần upload ít nhất 1 file</span>
          )}
          {!config.required && documents.length === 0 && (
            <span className="text-gray-400">📂 Có thể bỏ qua bước này</span>
          )}
        </div>
      </div>
    </div>
  );
};

const DocumentItem = ({ document, index, onRemove, config }) => {
  const [showPreview, setShowPreview] = useState(false);

  const isPDF = document.name.toLowerCase().endsWith('.pdf');

  return (
    <>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="flex items-center space-x-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${config.color}-100 dark:bg-${config.color}-900`}
          >
            {isPDF ? (
              <FileText className="h-5 w-5 text-red-500" />
            ) : (
              <config.icon
                className={`h-5 w-5 text-${config.color}-600 dark:text-${config.color}-400`}
              />
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {config.label} #{index + 1}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {document.name}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
            title="Xem trước"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onRemove(document.id)}
            className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
            title="Xóa"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative max-h-[90vh] max-w-[90vw] rounded-xl bg-white p-4 dark:bg-gray-800">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-2 -right-2 z-10 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
              aria-label="Đóng xem trước"
            >
              <X className="h-4 w-4" />
            </button>
            
            {isPDF ? (
              <div className="text-center">
                <FileText className="mx-auto mb-4 h-16 w-16 text-red-500" />
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {document.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  File PDF - Click để tải xuống
                </p>
                <a
                  href={document.url}
                  download={document.name}
                  className="mt-4 inline-flex items-center rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Tải xuống PDF
                </a>
              </div>
            ) : (
              <img
                src={document.url}
                alt={`${config.label} ${index + 1}`}
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
              />
            )}
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {config.label} #{index + 1}
              </p>
              <p className="text-xs text-gray-500">{document.name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Demo component với flow tuần tự
const DocumentUploadDemo = ({ studentId, onFinalSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState({
    transcript: [],
    personal_achievement: [],
    social_activity: [],
    scholarship: [],
  });
  const [skippedSteps, setSkippedSteps] = useState(new Set());
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState('');
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const resultRef = React.useRef<HTMLDivElement | null>(null);

  // Fix logic mapping step -> document type
  const getDocumentTypeByStep = (step) => {
    const mapping = {
      1: 'transcript',
      2: 'personal_achievement', 
      3: 'social_activity',
      4: 'scholarship'
    };
    return mapping[step];
  };

  const currentDocumentType = getDocumentTypeByStep(currentStep);

  console.log(`📍 Current Step: ${currentStep}, Document Type: ${currentDocumentType}`);
  console.log(`📊 Available DOCUMENT_TYPES:`, Object.keys(DOCUMENT_TYPES));
  console.log(`📊 Step mapping:`, Object.entries(DOCUMENT_TYPES).map(([key, val]) => `${key}: step ${val.step}`));
  console.log(`🔧 Fixed mapping: 1→transcript, 2→personal_achievement, 3→social_activity, 4→scholarship`);

  const isLastStep = currentStep === 4;
  const isTranscriptStep = currentStep === 1; // Bảng điểm là bắt buộc

  const handleStepComplete = (type, documents) => {
    console.log(`🔄 Step complete - Type: ${type}, Files: ${documents.length}`);
    
    // CHỈ reset submissionResult khi user bắt đầu upload file mới ở step 1 (transcript)
    // Tức là user đang bắt đầu quy trình upload mới
    if (type === 'transcript' && documents.length > 0 && submissionResult) {
      console.log('🔄 User bắt đầu upload mới, reset submissionResult');
      setSubmissionResult(null);
    }
    
    // Lưu data của step hiện tại
    setStepData(prev => ({
      ...prev,
      [type]: documents
    }));
    
    // KHÔNG tự động chuyển step ở đây - để cho useEffect xử lý
    // if (currentStep < 4) {
    //   setCurrentStep(prev => prev + 1);
    // }
  };

  // Function OCR để xử lý bảng điểm
  const processTranscriptOCR = async (file) => {
    try {
      setIsProcessingOCR(true);
      
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        console.error('GEMINI_API_KEY not found');
        return { gpa: "0.00", credits: "0" };
      }
      
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      // Convert file to generative part
      const imagePart = await fileToGenerativePart(file);
      
      const prompt = "Hãy phân tích bảng điểm này và trả về JSON với format: {\"gpa\": \"X.XX\", \"credits\": \"XX\"}. Chỉ trả về JSON, không có text khác.";
      
      // Gọi Gemini để OCR
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        console.error('No OCR text returned');
        return { gpa: "0.00", credits: "0" };
      }
      
      // Remove markdown code blocks nếu có
      let jsonText = text;
      if (text.includes('```json')) {
        jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      }
      
      // Parse JSON từ OCR result
      const ocrData = JSON.parse(jsonText);
      console.log('Transcript OCR Result:', ocrData);
      
      return {
        gpa: ocrData.gpa,
        credits: ocrData.credits
      };
    } catch (error) {
      console.error('OCR Error:', error);
      return { gpa: "0.00", credits: "0" };
    } finally {
      setIsProcessingOCR(false);
    }
  };

  // Helper function to convert file to generative part
  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result?.toString().split(',')[1]);
      reader.readAsDataURL(file);
    });
    
    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type
      },
    };
  };



  // Load data sẵn có khi component mount - CHỈ KHI CHƯA CÓ SUBMISSION RESULT
  useEffect(() => {
    // Chỉ load data khi chưa có submissionResult và chưa có file nào được upload
    const hasAnyFiles = Object.values(stepData).some(files => files.length > 0);
    
    if (!submissionResult && !hasAnyFiles) {
      const loadExistingData = async () => {
        const studentId = "23520123"; // Lấy từ user context
        await fetchLatestAcademicData(studentId);
      };
      
      loadExistingData();
    }
  }, []); // Chỉ chạy 1 lần khi mount

  // DISABLED - Tắt tự động chuyển step, chỉ dùng manual button
  // useEffect(() => {
  //   const currentType = Object.keys(DOCUMENT_TYPES).find(
  //     key => DOCUMENT_TYPES[key].step === currentStep
  //   );
    
  //   if (currentType && stepData[currentType] && stepData[currentType].length > 0) {
  //     // Nếu có file, tự động chuyển step sau 0.5 giây
  //     const timer = setTimeout(() => {
  //       if (currentStep < 4) {
  //         setCurrentStep(prev => prev + 1);
  //       }
  //     }, 500); // Giảm từ 1000ms xuống 500ms
      
  //     return () => clearTimeout(timer);
  //   }
  // }, [stepData, currentStep]);

  // Reset submissionResult khi stepData thay đổi (user upload/remove file)
  useEffect(() => {
    const hasAnyFiles = Object.values(stepData).some(files => files.length > 0);
    if (hasAnyFiles && submissionResult) {
      console.log('🔄 Reset submissionResult vì user đã upload file mới');
      setSubmissionResult(null);
    }
  }, [stepData, submissionResult]);

  const handleSkipStep = () => {
    // Đánh dấu step hiện tại là đã bỏ qua
    setSkippedSteps(prev => new Set([...prev, currentStep]));
    
    // Chuyển sang step tiếp theo
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleGoBack = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  // Function để lấy data mới nhất từ API - CHỈ SAU KHI SUBMIT THÀNH CÔNG
  const fetchLatestAcademicData = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/academic/get_record/${studentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        const academicData = result.data.academic;
        
        console.log('📊 Latest academic data AFTER submit:', academicData);
        
        // CHỈ set result khi được gọi từ handleFinalSubmit (sau khi submit thành công)
        // Không tự động set khi component mount
        setSubmissionResult({
          gpa: academicData.gpa,
          credits: academicData.total_credits_earned,
          hasPersonalAchievement: academicData.has_personal_achievement,
          hasSocialActivity: academicData.has_social_activity || academicData.has_leadership_role,
          hasScholarship: academicData.has_scholarship,
          transcriptCount: academicData.transcripts?.length || 0,
          achievementCount: academicData.achievement_award_count || 0,
          activityCount: academicData.extracurricular_activity_count || 0,
          scholarshipCount: academicData.scholarship_count || 0
        });
      } else if (response.status === 404) {
        console.log('📝 Chưa có dữ liệu academic cho student này');
        // Không làm gì, để user upload bình thường
      } else {
        console.error('Failed to fetch latest academic data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching academic data:', error);
    }
  };

  const handleFinalSubmit = async () => {
      console.log('🚀 handleFinalSubmit called!');
      console.log('� Student ID from props:', studentId);
      console.log('�📊 Current stepData:', stepData);
      console.log('📈 File counts:', {
        transcript: stepData.transcript.length,
        personal_achievement: stepData.personal_achievement.length,
        social_activity: stepData.social_activity.length,
        scholarship: stepData.scholarship.length
      });    // Prevent multiple submissions
    if (isSubmitting) {
      console.log('⚠️ Already submitting, ignore click');
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionStep('Đang phân tích bảng điểm...');
    
    try {
      // Xử lý OCR cho bảng điểm nếu có
      let gpa = 0;
      let credits = 0;
      
      if (stepData.transcript && stepData.transcript.length > 0) {
        const ocrResult = await processTranscriptOCR(stepData.transcript[0].file);
        gpa = parseFloat(ocrResult.gpa) || 0; // Giữ nguyên GPA hệ 10
        credits = parseInt(ocrResult.credits) || 0;
        
        console.log(`📊 GPA hệ 10: ${gpa}, Credits: ${credits}`);
      }

      setSubmissionStep('Đang chuẩn bị dữ liệu...');

      // Tạo academic data từ step data
      const academicData = {
        student_id: studentId || "23520123", // Sử dụng studentId từ props hoặc fallback
        study_year: new Date().getFullYear().toString(),
        term: 1,
        gpa: Math.round(gpa * 100) / 100, // Làm tròn 2 chữ số thập phân
        current_gpa: Math.round(gpa * 100) / 100, // Same as gpa
        total_credits_earned: credits,
        failed_course_count: 0, // Default
        achievement_award_count: stepData.personal_achievement.length, // ĐẾM SỐ FILE THÀNH TÍCH
        extracurricular_activity_count: stepData.social_activity.length, // ĐẾM SỐ FILE HOẠT ĐỘNG
        scholarship_count: stepData.scholarship.length, // ĐẾM SỐ FILE HỌC BỔNG
        has_personal_achievement: stepData.personal_achievement.length > 0,
        has_social_activity: stepData.social_activity.length > 0,
        has_scholarship: stepData.scholarship.length > 0,
        has_leadership_role: stepData.social_activity.length > 0, // Coi hoạt động XH = leadership
        transcripts: []
      };

      // Thêm transcripts từ stepData
      Object.keys(stepData).forEach(type => {
        if (stepData[type].length > 0) {
          stepData[type].forEach(document => {
            academicData.transcripts.push({
              document_type: type,
              file_name: document.name,
              file_size: document.file.size,
              file_type: document.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image',
              file_url: document.url, // URL từ createObjectURL
              mime_type: document.file.type,
              upload_date: new Date().toISOString(),
              uploaded_at: new Date(),
              processed: false // Sẽ được xử lý sau
            });
          });
        }
      });

      console.log('=== BẮT ĐẦU GỬI DỮ LIỆU XUỐNG BACKEND ===');
      console.log('🎯 Student ID:', academicData.student_id);
      console.log('📊 GPA:', academicData.gpa);
      console.log('📊 Current GPA:', academicData.current_gpa);
      console.log('🏆 Total Credits Earned:', academicData.total_credits_earned);
      console.log('📄 Transcripts:', academicData.transcripts);
      console.log('🏅 Has Personal Achievement:', academicData.has_personal_achievement);
      console.log('👥 Has Social Activity:', academicData.has_social_activity);
      console.log('💰 Scholarship Count:', academicData.scholarship_count);
      console.log('📋 Academic Data to submit (FULL OBJECT):');
      console.table(academicData);
      console.log('📤 JSON String gửi đi:', JSON.stringify(academicData, null, 2));
      console.log('🔍 Object.keys:', Object.keys(academicData));
      console.log('🔍 Kiểm tra từng field:');
      for (const [key, value] of Object.entries(academicData)) {
        console.log(`  ${key}:`, value, `(type: ${typeof value})`);
      }
      
      setSubmissionStep('Đang lưu vào cơ sở dữ liệu...');
      console.log('🌐 Đang gọi API create/update...');
      
      let isSuccess = false;
      let responseData = null;
      
      // Thử create trước, nếu conflict thì update
      try {
        console.log('📡 ===== CALLING academic.create API =====');
        console.log('📤 Data gửi đi:', academicData);
        const createResponse = await academic.create(academicData);
        console.log('📥 ===== RESPONSE TỪ academic.create =====');
        console.log('📊 Status:', createResponse.status);
        console.log('📦 Data nhận về:', createResponse.data);
        console.log('📝 Full response object:', createResponse);
        
        if (createResponse.status === 200 || createResponse.status === 201) {
          console.log('✅ Create successful:', createResponse.data);
          isSuccess = true;
          responseData = createResponse.data;
        }
      } catch (error: any) {
        console.log('❌ ===== ERROR TỪ academic.create =====');
        console.log('🚨 Error object:', error);
        console.log('🚨 Error message:', error.message);
        console.log('🚨 Error response:', error.response);
        console.log('🚨 Error status:', error.response?.status);
        console.log('🚨 Error data:', error.response?.data);
        
        // Nếu 409 Conflict (record đã tồn tại), thử update
        if (error.response?.status === 409) {
          setSubmissionStep('Đang cập nhật thông tin...');
          console.log('🔄 Record đã tồn tại, chuyển sang update...');
          console.log('📡 ===== CALLING academic.update API =====');
          console.log('📤 Student ID:', academicData.student_id);
          console.log('📤 Data gửi đi:', academicData);
          
          try {
            const updateResponse = await academic.update(academicData.student_id, academicData);
            console.log('📥 ===== RESPONSE TỪ academic.update =====');
            console.log('📊 Status:', updateResponse.status);
            console.log('📦 Data nhận về:', updateResponse.data);
            console.log('📝 Full response object:', updateResponse);
            
            if (updateResponse.status === 200) {
              console.log('✅ Update successful:', updateResponse.data);
              isSuccess = true;
              responseData = updateResponse.data;
            } else {
              throw new Error(`Update failed with status: ${updateResponse.status}`);
            }
          } catch (updateError) {
            console.log('❌ ===== ERROR TỪ academic.update =====');
            console.log('🚨 Update Error:', updateError);
            throw updateError;
          }
        } else {
          console.log('❌ Create API Error:', error);
          throw error;
        }
      }

      console.log('🔍 DEBUG: isSuccess =', isSuccess);
      console.log('🔍 DEBUG: responseData =', responseData);

      if (isSuccess) {
        console.log('🎉 ===== API THÀNH CÔNG =====');
        console.log('✅ API Response thành công:', responseData);
        console.log('🔄 Sẽ set submissionResult và gọi onFinalSubmit...');
        
        // Set submission result để hiển thị kết quả
        console.log('🔧 Setting submissionResult with data:', {
          gpa: academicData.gpa,
          credits: academicData.total_credits_earned,
          hasPersonalAchievement: academicData.has_personal_achievement,
          hasSocialActivity: academicData.has_social_activity || academicData.has_leadership_role,
          hasScholarship: academicData.has_scholarship,
          transcriptCount: academicData.transcripts?.length || 0,
          achievementCount: academicData.achievement_award_count || 0,
          activityCount: academicData.extracurricular_activity_count || 0,
          scholarshipCount: academicData.scholarship_count || 0
        });
        
        setSubmissionResult({
          gpa: academicData.gpa,
          credits: academicData.total_credits_earned,
          hasPersonalAchievement: academicData.has_personal_achievement,
          hasSocialActivity: academicData.has_social_activity || academicData.has_leadership_role,
          hasScholarship: academicData.has_scholarship,
          transcriptCount: academicData.transcripts?.length || 0,
          achievementCount: academicData.achievement_award_count || 0,
          activityCount: academicData.extracurricular_activity_count || 0,
          scholarshipCount: academicData.scholarship_count || 0
        });
        console.log('✅ submissionResult đã được set');
        
        // Scroll đến kết quả sau một frame
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        // Reload trang sau 2 giây để refresh data
        setTimeout(() => {
          console.log('🔄 Reloading page to refresh data...');
          window.location.reload();
        }, 500);
        
        // Gọi callback nếu có để invalidate cache
        if (onFinalSubmit) {
          console.log('📞 Calling onFinalSubmit callback...');
          onFinalSubmit(academicData);
          console.log('✅ onFinalSubmit callback completed');
        } else {
          console.log('⚠️ onFinalSubmit callback không tồn tại');
        }
        
        console.log('=== KẾT THÚC QUÁ TRÌNH GỬI DỮ LIỆU ===');
      } else {
        console.log('❌ ===== API THẤT BẠI =====');
        throw new Error('Failed to save academic data');
      }
      
    } catch (error) {
      console.error('Error submitting academic data:', error);
      alert('Có lỗi xảy ra khi cập nhật thông tin học tập!');
    } finally {
      setIsSubmitting(false);
      setSubmissionStep('');
    }
  };

  const getStepProgress = () => {
    const totalSteps = 4;
    // Progress dựa trên currentStep (1-4)
    return ((currentStep - 1) / (totalSteps - 1)) * 100;
  };

  const canProceedToNextStep = () => {
    if (isTranscriptStep) {
      // Bảng điểm phải có ít nhất 1 file
      return stepData.transcript.length > 0;
    }
    // Các bước khác có thể bỏ qua
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${getStepProgress()}%` }}
        ></div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-between items-center">
        {Object.values(DOCUMENT_TYPES).map((type) => {
          const isCompleted = stepData[Object.keys(DOCUMENT_TYPES)[type.step - 1]].length > 0;
          const isSkipped = skippedSteps.has(type.step);
          const isCurrent = type.step === currentStep;
          
          return (
            <div key={type.step} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                isCompleted 
                  ? 'bg-green-500 text-white' 
                  : isSkipped
                  ? 'bg-gray-400 text-white'
                  : isCurrent 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
              }`}>
                {isCompleted ? '✓' : isSkipped ? '−' : type.step}
              </div>
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                {type.label}
              </span>
              {isSkipped && (
                <span className="text-xs text-gray-400">(Đã bỏ qua)</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step Content */}
      {currentDocumentType ? (
        <DocumentUpload
          documents={stepData[currentDocumentType as keyof typeof stepData] || []}
          onDocumentsChange={(docs: any) => 
            setStepData(prev => ({
              ...prev,
              [currentDocumentType]: docs
            }))
          }
          documentType={currentDocumentType}
          onStepComplete={handleStepComplete}
          currentStep={currentStep}
          onFinalSubmit={handleFinalSubmit}
          isLastStep={isLastStep}
          canSkip={!isTranscriptStep}
          onSkip={handleSkipStep}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-red-500">❌ Không tìm thấy loại document cho step {currentStep}</p>
          <p className="text-sm text-gray-500 mt-2">Debug: currentDocumentType = {currentDocumentType}</p>
        </div>
      )}

      {/* Step Navigation */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Bước trước
        </button>

        {/* Button cập nhật ở step cuối */}
        {isLastStep ? (
          <button
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer'
            } text-white`}
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>{isSubmitting ? 'Đang xử lý...' : 'Cập nhật thông tin học tập'}</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            {/* Skip button cho các step không bắt buộc */}
            {!isTranscriptStep && (
              <button
                onClick={handleSkipStep}
                className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
              >
                Bỏ qua
              </button>
            )}
            
            {/* Next button */}
            <button
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
              disabled={currentStep === 4 || (isTranscriptStep && !canProceedToNextStep())}
              className={`px-4 py-2 rounded-lg font-medium ${
                (isTranscriptStep && !canProceedToNextStep())
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer'
              }`}
            >
              {isTranscriptStep && !canProceedToNextStep() ? 'Cần upload bảng điểm' : 'Bước tiếp →'}
            </button>
          </div>
        )}
      </div>

      {/* Loading Modal */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="rounded-xl bg-white p-8 shadow-2xl dark:bg-gray-800">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Đang xử lý thông tin học tập
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Vui lòng chờ trong giây lát...
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-500"></div>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-500 delay-75"></div>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-500 delay-150"></div>
                  </div>
                  <span>{submissionStep}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kết quả sau khi submit thành công */}
      {submissionResult && (
        <div ref={resultRef} className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
              Cập nhật thông tin học tập thành công!
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* GPA */}
            <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {submissionResult.gpa}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">GPA (hệ 10)</div>
            </div>

            {/* Tín chỉ */}
            <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {submissionResult.credits}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tín chỉ</div>
            </div>

            {/* Thành tích */}
            <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {submissionResult.achievementCount || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Thành tích</div>
            </div>

            {/* Hoạt động */}
            <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {submissionResult.activityCount || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hoạt động XH</div>
            </div>

            {/* Học bổng */}
            <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {submissionResult.scholarshipCount || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Học bổng</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadDemo;
