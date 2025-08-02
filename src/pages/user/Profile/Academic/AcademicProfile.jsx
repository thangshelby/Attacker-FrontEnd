import React, { useState, useEffect } from 'react';
import { User, Award, BookOpen, Trophy, Users, CheckCircle, XCircle, Star, GraduationCap } from 'lucide-react';

const AcademicProfile = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [academicData, setAcademicData] = useState(null);

  // Mock student data
  const studentInfo = {
    name: "Ngô Nguyễn Đức Thắng",
    studentId: "k224141694",
    university: "Đại học Kinh tế - Luật - DHQG TPHCM",
    major: "Công nghệ Thông tin",
    year: 3,
    specialty: "FINTECH"
  };

  // Mock academic data
  const mockAcademicData = {
    current_gpa: 3.45,
    total_credits_earned: 89,
    failed_course_count: 2,
    achievement_award_count: 5,
    has_scholarship: true,
    scholarship_count: 2,
    extracurricular_activities_count: 7,
    has_leadership_role: true,
    created_at: "2024-09-01",
    updated_at: "2024-07-30"
  };

  useEffect(() => {
    // Simulate DID verification check
    setTimeout(() => {
      const verified = Math.random() > 0.3; // 70% chance of being verified for demo
      setIsVerified(verified);
      if (verified) {
        setAcademicData(mockAcademicData);
      }
      setLoading(false);
    }, 1500);
  }, []);

  const getGPAColor = (gpa) => {
    if (gpa >= 3.6) return 'text-green-400';
    if (gpa >= 3.0) return 'text-blue-400';
    if (gpa >= 2.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGPALevel = (gpa) => {
    if (gpa >= 3.6) return 'Xuất sắc';
    if (gpa >= 3.2) return 'Giỏi';
    if (gpa >= 2.5) return 'Khá';
    if (gpa >= 2.0) return 'Trung bình';
    return 'Yếu';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white">Đang kiểm tra xác minh DID...</p>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 max-w-md w-full text-center">
          <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Chưa xác minh DID</h2>
          <p className="text-gray-300 mb-6">
            Bạn cần xác minh ví DID trước khi có thể xem thông tin kết quả học tập.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
            Xác minh DID
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Kết Quả Học Tập</h1>
                <p className="text-gray-300 text-sm">Xem thành tích học tập của bạn</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">DID đã xác minh</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Student Info Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-purple-600 p-3 rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{studentInfo.name}</h2>
              <p className="text-gray-300">{studentInfo.studentId}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Trường đại học:</span>
              <p className="text-white">{studentInfo.university}</p>
            </div>
            <div>
              <span className="text-gray-400">Ngành học:</span>
              <p className="text-white">{studentInfo.major}</p>
            </div>
            <div>
              <span className="text-gray-400">Năm học:</span>
              <p className="text-white">Năm {studentInfo.year}</p>
            </div>
            <div>
              <span className="text-gray-400">Chuyên ngành:</span>
              <p className="text-white">{studentInfo.specialty}</p>
            </div>
          </div>
        </div>

        {/* Academic Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className={`text-2xl font-bold ${getGPAColor(academicData.current_gpa)}`}>
                {academicData.current_gpa}
              </span>
            </div>
            <h3 className="text-white font-medium">GPA Hiện Tại</h3>
            <p className={`text-sm ${getGPAColor(academicData.current_gpa)}`}>
              {getGPALevel(academicData.current_gpa)}
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="h-6 w-6 text-yellow-400" />
              <span className="text-2xl font-bold text-white">{academicData.total_credits_earned}</span>
            </div>
            <h3 className="text-white font-medium">Tín Chỉ Tích Lũy</h3>
            <p className="text-gray-400 text-sm">Tổng tín chỉ đã hoàn thành</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-6 w-6 text-purple-400" />
              <span className="text-2xl font-bold text-white">{academicData.achievement_award_count}</span>
            </div>
            <h3 className="text-white font-medium">Thành Tích</h3>
            <p className="text-gray-400 text-sm">Giải thưởng đạt được</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-6 w-6 text-green-400" />
              <span className="text-2xl font-bold text-white">{academicData.extracurricular_activities_count}</span>
            </div>
            <h3 className="text-white font-medium">Hoạt Động Ngoại Khóa</h3>
            <p className="text-gray-400 text-sm">Số hoạt động tham gia</p>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Academic Details */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
              Chi Tiết Học Tập
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-300">Môn học trượt</span>
                <span className={`font-medium ${academicData.failed_course_count > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {academicData.failed_course_count} môn
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-300">Có học bổng</span>
                <div className="flex items-center">
                  {academicData.has_scholarship ? (
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 mr-2" />
                  )}
                  <span className={`font-medium ${academicData.has_scholarship ? 'text-green-400' : 'text-red-400'}`}>
                    {academicData.has_scholarship ? 'Có' : 'Không'}
                  </span>
                </div>
              </div>
              
              {academicData.has_scholarship && (
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Số học bổng</span>
                  <span className="font-medium text-yellow-400">{academicData.scholarship_count} học bổng</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-300">Vai trò lãnh đạo</span>
                <div className="flex items-center">
                  {academicData.has_leadership_role ? (
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 mr-2" />
                  )}
                  <span className={`font-medium ${academicData.has_leadership_role ? 'text-green-400' : 'text-red-400'}`}>
                    {academicData.has_leadership_role ? 'Có' : 'Không'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements & Activities */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-400" />
              Thành Tích & Hoạt Động
            </h3>
            
            <div className="space-y-6">
              {/* Achievement Summary */}
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Tổng Quan Thành Tích</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{academicData.achievement_award_count}</div>
                    <div className="text-gray-400">Giải thưởng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{academicData.scholarship_count || 0}</div>
                    <div className="text-gray-400">Học bổng</div>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Hoạt Động Ngoại Khóa</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{academicData.extracurricular_activities_count}</div>
                  <div className="text-gray-400 text-sm">Hoạt động đã tham gia</div>
                  {academicData.has_leadership_role && (
                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-600/20 text-purple-400 border border-purple-600/30">
                      <Users className="h-3 w-3 mr-1" />
                      Có vai trò lãnh đạo
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Cập nhật lần cuối: {new Date(academicData.updated_at).toLocaleDateString('vi-VN')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcademicProfile;