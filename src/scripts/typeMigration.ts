// Script để tự động type hóa các component từ JavaScript sang TypeScript
// Chạy script này để cập nhật tất cả các component chưa được type hóa

import * as fs from 'fs';
import * as path from 'path';

// Các pattern để tìm và thay thế
const patterns = [
  // Function components
  {
    find: /const\s+(\w+)\s*=\s*\(\)\s*=>\s*{/g,
    replace: 'const $1: React.FC = () => {'
  },
  {
    find: /function\s+(\w+)\s*\(\)\s*{/g,
    replace: 'const $1: React.FC = () => {'
  },
  // Props destructuring
  {
    find: /const\s+(\w+)\s*=\s*\(\s*{\s*([^}]+)\s*}\s*\)\s*=>\s*{/g,
    replace: 'const $1: React.FC<{ $2 }> = ({ $2 }) => {'
  },
  // useState
  {
    find: /useState\s*\(\s*([^)]+)\s*\)/g,
    replace: 'useState<$1>($1)'
  },
  // useRef
  {
    find: /useRef\s*\(\s*null\s*\)/g,
    replace: 'useRef<HTMLDivElement>(null)'
  },
  // Event handlers
  {
    find: /onClick\s*=\s*\(\s*\)\s*=>\s*{/g,
    replace: 'onClick = (): void => {'
  },
  {
    find: /onChange\s*=\s*\(\s*e\s*\)\s*=>\s*{/g,
    replace: 'onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {'
  },
  // Props interface
  {
    find: /interface\s+(\w+)Props\s*{/g,
    replace: 'interface $1Props extends BaseComponentProps {'
  }
];

// Các file cần được type hóa
const filesToType = [
  'src/components/user/header/Header.tsx',
  'src/components/user/Sidebar.tsx',
  'src/components/user/Table.tsx',
  'src/components/user/ThemeToggle.tsx',
  'src/components/user/elements/BaseCard.tsx',
  'src/components/shared/FormField.tsx',
  'src/components/shared/ImageUpload.tsx',
  'src/components/shared/StatusBadge.tsx',
  'src/components/shared/chatbot/chatbot.tsx',
  'src/components/admin/dashboard/Overview.tsx',
  'src/components/admin/loandetail/AdminComment.tsx',
  'src/components/admin/loandetail/AgentCard.tsx',
  'src/components/admin/loandetail/AgentDebate.tsx',
  'src/components/admin/loandetail/AgentOpinions.tsx',
  'src/components/admin/loandetail/DecisionBade.tsx',
  'src/pages/auth/LoginPage.tsx',
  'src/pages/auth/RegisterPage.tsx',
  'src/pages/auth/VerifyEmail.tsx',
  'src/pages/user/Home/Home.tsx',
  'src/pages/user/LandingPage/LandingPage.tsx',
  'src/pages/user/NewLoan/NewLoans.tsx',
  'src/pages/user/Profile/Profile.tsx',
  'src/pages/user/Profile/Academic/AcademicProfile.tsx',
  'src/pages/user/Profile/Academic/AcademicProfileNotVerified.tsx',
  'src/pages/user/Profile/Academic/NotVerified.tsx',
  'src/pages/user/Profile/UniversityProfile/UniversityProfile.tsx',
  'src/pages/user/Profile/UserProfile/UserProfile.tsx',
  'src/pages/user/SettingPage/SettingPage.tsx',
  'src/pages/user/UserLoan/LoanDetail.tsx',
  'src/pages/user/UserLoan/LoanHistory.tsx',
  'src/pages/user/UserLoan/LoanNew.tsx',
  'src/pages/admin/AdminDashboard.tsx',
  'src/pages/admin/Debate2.tsx',
  'src/pages/admin/DebateAgent.tsx',
  'src/pages/admin/LoanDetail.tsx',
  'src/pages/admin/OverviewLoans.tsx',
  'src/pages/admin/PaymentSchedule.tsx',
  'src/pages/admin/RiskAnalyze.tsx',
  'src/hooks/useAcademic.tsx',
  'src/hooks/useAuth.tsx',
  'src/hooks/useIdentityProfile.tsx',
  'src/hooks/useLoan.tsx',
  'src/hooks/useNotification.tsx',
  'src/hooks/useStudent.tsx',
  'src/hooks/useTheme.tsx',
  'src/hooks/useUser.tsx',
  'src/layouts/AdminLayout.tsx',
  'src/layouts/AuthLayout.tsx',
  'src/layouts/SidebarLayout.tsx',
  'src/services/notification.service.ts',
  'src/services/socket.ts',
  'src/store/notificationStore.ts',
  'src/store/web3Store.ts',
  'src/utils/ProtectedAcademicProfile.tsx',
  'src/utils/ProtectedRoute.tsx'
];

// Function để thêm import React.FC
function addReactFCImport(content: string): string {
  if (!content.includes('import React')) {
    return `import React from 'react';\n${content}`;
  }
  if (!content.includes('React.FC') && !content.includes('React.FC')) {
    return content.replace(
      /import React from ['"]react['"];?/,
      'import React from \'react\';\nimport { BaseComponentProps } from \'@/types\';'
    );
  }
  return content;
}

// Function để type hóa một file
function typeFile(filePath: string): void {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Thêm import React.FC nếu cần
    content = addReactFCImport(content);
    
    // Áp dụng các pattern
    patterns.forEach(pattern => {
      content = content.replace(pattern.find, pattern.replace);
    });
    
    // Lưu file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Typed: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error typing ${filePath}:`, error);
  }
}

// Function để tìm tất cả các file .tsx và .ts
function findTypeScriptFiles(dir: string): string[] {
  const files: string[] = [];
  
  function traverse(currentDir: string) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    });
  }
  
  traverse(dir);
  return files;
}

// Main function
function main() {
  console.log('🚀 Starting TypeScript migration...');
  
  // Type hóa các file cụ thể
  filesToType.forEach(file => {
    typeFile(file);
  });
  
  // Tìm và type hóa tất cả các file TypeScript
  const allFiles = findTypeScriptFiles('./src');
  console.log(`Found ${allFiles.length} TypeScript files`);
  
  // Type hóa các file chưa được type hóa
  allFiles.forEach(file => {
    if (!filesToType.includes(file.replace('./', ''))) {
      typeFile(file);
    }
  });
  
  console.log('✅ TypeScript migration completed!');
}

// Export để có thể chạy từ command line
if (require.main === module) {
  main();
}

export { typeFile, findTypeScriptFiles, main }; 