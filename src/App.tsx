import { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  RefreshCw, 
  HelpCircle, 
  Database, 
  GraduationCap, 
  Sparkles, 
  Briefcase,
  Layers,
  X,
  Trophy,
  Flame,
  Award,
  Timer,
  Lock,
  Unlock,
  Copy,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { challenges, tableSchemas } from './data/challenges';
import { caseStudies } from './data/caseStudies';
import { interviewQuestions } from './data/interviewQuestions';
import { runQuery, getTableData, getDb } from './utils/db';
import type { QueryResult } from './utils/db';
import { compareOutputs } from './utils/grader';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: any;
  criteria: string;
}

function App() {
  const [activeChallengeId, setActiveChallengeId] = useState<number>(1);
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  
  // Theme state
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem('sqlizor_theme');
    return (saved as "dark" | "light") || "dark";
  });

  useEffect(() => {
    localStorage.setItem('sqlizor_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  const [editorSql, setEditorSql] = useState<string>("");
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gradeMessage, setGradeMessage] = useState<string>("");
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [solvedChallenges, setSolvedChallenges] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"challenges" | "achievements" | "interview" | "qa">("challenges");
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<number>(1);
  const [copiedCaseStudyId, setCopiedCaseStudyId] = useState<number | null>(null);
  const [selectedQaId, setSelectedQaId] = useState<number>(1);
  const [copiedQaQueryId, setCopiedQaQueryId] = useState<number | null>(null);
  
  // Table preview modal state
  const [previewTableName, setPreviewTableName] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);

  // Gamification state
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('sql_tutor_xp');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('sql_tutor_streak');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lastSolvedDate, setLastSolvedDate] = useState<string | null>(() => {
    return localStorage.getItem('sql_tutor_last_solved_date');
  });

  // Timer state
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const activeChallenge = challenges.find(c => c.id === activeChallengeId) || challenges[0];

  // Pre-initialize database on mount
  useEffect(() => {
    getDb().catch(err => console.error("Failed to initialize SQLite Wasm:", err));
  }, []);

  // Timer effect
  useEffect(() => {
    setElapsedSeconds(0);
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeChallengeId]);

  // Load editor state or query template
  useEffect(() => {
    const savedQuery = localStorage.getItem(`sql_tutor_query_${activeChallengeId}`);
    if (savedQuery) {
      setEditorSql(savedQuery);
    } else {
      setEditorSql(`-- Write your SQL query here\n-- Challenge: ${activeChallenge.title}\n\nSELECT \n  \nFROM ${activeChallenge.schemaTables[0]}\n`);
    }
    setQueryResult(null);
    setIsCorrect(null);
    setGradeMessage("");
    setShowSolution(false);
  }, [activeChallengeId]);

  // Load solved challenges from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sql_tutor_solved');
    if (saved) {
      try {
        setSolvedChallenges(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Check and maintain streak
  useEffect(() => {
    if (lastSolvedDate) {
      const today = new Date().toISOString().split('T')[0];
      const last = new Date(lastSolvedDate);
      const diffTime = Math.abs(new Date(today).getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // If last solved date was more than 1 day ago (not today or yesterday), reset streak
      if (diffDays > 1) {
        setStreak(0);
        localStorage.setItem('sql_tutor_streak', '0');
      }
    }
  }, [lastSolvedDate]);

  const saveSolved = (id: number) => {
    const newSolved = [...solvedChallenges];
    if (!newSolved.includes(id)) {
      newSolved.push(id);
      setSolvedChallenges(newSolved);
      localStorage.setItem('sql_tutor_solved', JSON.stringify(newSolved));
    }
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    if (lastSolvedDate !== today) {
      const newStreak = streak === 0 ? 1 : streak + 1;
      setStreak(newStreak);
      setLastSolvedDate(today);
      localStorage.setItem('sql_tutor_streak', String(newStreak));
      localStorage.setItem('sql_tutor_last_solved_date', today);
    }
  };

  const getXPReward = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return 50;
      case "Intermediate": return 100;
      case "Advanced": return 200;
      default: return 50;
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${String(remainingSecs).padStart(2, '0')}`;
  };

  const handleEditorChange = (val: string) => {
    setEditorSql(val);
    localStorage.setItem(`sql_tutor_query_${activeChallengeId}`, val);
  };

  const handleRunQuery = async () => {
    if (!editorSql.trim()) return;
    const res = await runQuery(editorSql);
    setQueryResult(res);
    setIsCorrect(null);
  };

  const handleSubmitAnswer = async () => {
    if (!editorSql.trim()) return;
    
    const userRes = await runQuery(editorSql);
    setQueryResult(userRes);

    if (!userRes.success || !userRes.data) {
      setIsCorrect(false);
      setGradeMessage(userRes.error || "Query failed to execute.");
      return;
    }

    const expectedRes = await runQuery(activeChallenge.expectedQuery);
    
    if (!expectedRes.success || !expectedRes.data) {
      setIsCorrect(false);
      setGradeMessage("Error verifying the target solution query. Please contact support.");
      return;
    }

    const grade = compareOutputs(userRes.data, expectedRes.data);
    setIsCorrect(grade.correct);

    if (grade.correct) {
      const wasSolved = solvedChallenges.includes(activeChallenge.id);
      if (!wasSolved) {
        const reward = getXPReward(activeChallenge.difficulty);
        const speedBonus = elapsedSeconds <= 45 ? 20 : 0;
        const totalXpAdded = reward + speedBonus;
        const newXp = xp + totalXpAdded;
        
        setXp(newXp);
        localStorage.setItem('sql_tutor_xp', String(newXp));
        
        const oldLevel = Math.floor(xp / 300) + 1;
        const newLevel = Math.floor(newXp / 300) + 1;
        
        let successMsg = `Success! Target output matched. +${reward} XP earned.`;
        if (speedBonus > 0) {
          successMsg += ` ⚡ Speedrun Bonus (+${speedBonus} XP)!`;
        }
        if (newLevel > oldLevel) {
          successMsg += ` 🎉 LEVEL UP! You reached Level ${newLevel}!`;
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#A78BFA', '#F472B6', '#10B981']
          });
        }
        setGradeMessage(successMsg);
        saveSolved(activeChallenge.id);
        updateStreak();
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#10B981', '#ffffff']
        });
      } else {
        setGradeMessage("Output matched successfully! (Already solved, no fresh XP awarded)");
      }
    } else {
      setGradeMessage(grade.message || "Outputs do not match the expected query.");
    }
  };

  const handleResetCode = () => {
    const template = `-- Write your SQL query here\n-- Challenge: ${activeChallenge.title}\n\nSELECT \n  \nFROM ${activeChallenge.schemaTables[0]}`;
    setEditorSql(template);
    localStorage.setItem(`sql_tutor_query_${activeChallengeId}`, template);
    setQueryResult(null);
    setIsCorrect(null);
    setGradeMessage("");
  };

  const handlePreviewTable = async (tableName: string) => {
    const data = await getTableData(tableName);
    setPreviewTableName(tableName);
    setPreviewData(data);
  };

  const filteredChallenges = challenges.filter(c => 
    difficultyFilter === "All" || c.difficulty === difficultyFilter
  );

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Beginner": return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";
      case "Intermediate": return "text-amber-400 border-amber-500/20 bg-amber-500/5";
      case "Advanced": return "text-rose-400 border-rose-500/20 bg-rose-500/5";
      default: return "text-textSubtle";
    }
  };

  const getCompanyColor = (company: string) => {
    switch (company) {
      case "Amazon": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Uber": return "bg-zinc-500/15 text-textSecondary border-zinc-500/20";
      case "Meta": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Netflix": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Stripe": return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Airbnb": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Spotify": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "TikTok": return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      case "Finance": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "Marketing": return "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20";
      case "IT Support": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default: return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    }
  };

  // Badges lists criteria checks
  const isJoinMaster = solvedChallenges.filter(id => {
    const c = challenges.find(ch => ch.id === id);
    return c && [4, 5, 7, 9, 10, 11, 13, 15, 16, 17].includes(id);
  }).length >= 3;

  const isRiskOfficer = [6, 10, 19].every(id => solvedChallenges.includes(id));
  const isWindowWizard = solvedChallenges.includes(8);
  const isSubquerySensei = solvedChallenges.includes(18);

  const badges: Badge[] = [
    {
      id: "first_solve",
      title: "SQL Explorer",
      description: "Solve your very first challenge",
      icon: Award,
      criteria: "unlocked",
      // unlocked if solvedChallenges.length >= 1
    },
    {
      id: "join_master",
      title: "Join Master",
      description: "Successfully join tables in 3 challenges",
      icon: Layers,
      criteria: "joins"
    },
    {
      id: "risk_officer",
      title: "Risk Officer",
      description: "Complete all Stripe dispute analytics challenges",
      icon: ShieldAlertBadge,
      criteria: "stripe"
    },
    {
      id: "window_wizard",
      title: "Window Wizard",
      description: "Solve Netflix engagement cumulative partition query",
      icon: Sparkles,
      criteria: "window"
    },
    {
      id: "subquery_sensei",
      title: "Subquery Sensei",
      description: "Solve Amazon category top 3 products query",
      icon: Trophy,
      criteria: "subquery"
    },
    {
      id: "all_hero",
      title: "SQL Hero",
      description: "Unlock all challenges in the workspace",
      icon: GraduationCap,
      criteria: "all"
    }
  ];

  const checkBadgeUnlocked = (badge: Badge) => {
    switch(badge.criteria) {
      case "unlocked": return solvedChallenges.length >= 1;
      case "joins": return isJoinMaster;
      case "stripe": return isRiskOfficer;
      case "window": return isWindowWizard;
      case "subquery": return isSubquerySensei;
      case "all": return solvedChallenges.length === challenges.length;
      default: return false;
    }
  };

  // Level stats
  const level = Math.floor(xp / 300) + 1;
  const levelProgress = ((xp % 300) / 300) * 100;

  return (
    <div className="min-h-screen bg-bgMain text-textPrimary font-sans flex flex-col relative overflow-x-hidden">
      
      {/* 1. Header */}
      <header className="border-b border-borderMain bg-headerSubtle70 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-purple-500 animate-pulse" />
          <div>
            <h1 className="text-xl font-bold tracking-wider uppercase bg-gradient-to-r from-[#646973] to-[#BBCCD7] bg-clip-text text-transparent">
              SQLizor
            </h1>
            <p className="text-xs text-textSubtle uppercase tracking-widest font-mono">zero to hero compiler</p>
          </div>
        </div>

        {/* Gamification Header Metrics */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          {/* Level & XP Progress Bar */}
          <div className="flex items-center gap-3 bg-subtleBg border border-borderMain rounded-2xl px-4 py-2 min-w-[200px]">
            <span className="font-bold text-purple-400">LVL {level}</span>
            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" 
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-textSubtle">{xp % 300}/300 XP</span>
          </div>

          {/* Daily Streak */}
          <div className="flex items-center gap-2 border border-borderMain rounded-2xl px-4 py-2 bg-subtleBg">
            <Flame className={`w-4 h-4 ${streak > 0 ? "text-orange-500 animate-bounce" : "text-zinc-600"}`} />
            <span className="font-semibold text-textSecondary">Streak: {streak} Day{streak !== 1 ? "s" : ""}</span>
          </div>

          <div className="bg-subtleBg border border-borderMain rounded-2xl px-4 py-2 text-textSecondary">
            <span>Progress: {solvedChallenges.length} / {challenges.length} Solved</span>
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center gap-2 border border-borderMain rounded-2xl px-4 py-2 bg-subtleBg hover:bg-activeBg text-textSecondary transition-all"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" /> : <Moon className="w-4 h-4 text-purpleAccent" />}
            <span className="font-semibold capitalize text-xs">{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-4.75rem)]">
        
        {/* LEFT COLUMN (Sidebar & Task details) - 5 Cols */}
        <div className="lg:col-span-5 border-r border-borderMain flex flex-col h-full overflow-hidden">
          
          {/* Toggle Tab Selectors */}
          <div className="flex border-b border-borderMain bg-cardSubtle30">
            <button
              onClick={() => setActiveTab("challenges")}
              className={`flex-1 py-3 text-xs uppercase font-mono tracking-wider font-semibold border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeTab === "challenges"
                  ? "border-purple-500 text-white bg-purple-500/5"
                  : "border-transparent text-textSubtle hover:text-textPrimary"
              }`}
            >
              <Layers className="w-4 h-4" /> Challenges
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`flex-1 py-3 text-xs uppercase font-mono tracking-wider font-semibold border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeTab === "achievements"
                  ? "border-purple-500 text-white bg-purple-500/5"
                  : "border-transparent text-textSubtle hover:text-textPrimary"
              }`}
            >
              <Trophy className="w-4 h-4" /> Achievements
            </button>
            <button
              onClick={() => setActiveTab("interview")}
              className={`flex-1 py-3 text-xs uppercase font-mono tracking-wider font-semibold border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeTab === "interview"
                  ? "border-purple-500 text-white bg-purple-500/5"
                  : "border-transparent text-textSubtle hover:text-textPrimary"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Case Studies
            </button>
            <button
              onClick={() => setActiveTab("qa")}
              className={`flex-1 py-3 text-xs uppercase font-mono tracking-wider font-semibold border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeTab === "qa"
                  ? "border-purple-500 text-white bg-purple-500/5"
                  : "border-transparent text-textSubtle hover:text-textPrimary"
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Tech Q&A
            </button>
          </div>

          {activeTab === "challenges" ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Challenge Selector Filters */}
              <div className="p-4 border-b border-borderMain bg-cardSubtle30">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-textSubtle">
                    Difficulty Level
                  </span>
                  
                  <div className="flex gap-1.5 text-xs">
                    {["All", "Beginner", "Intermediate", "Advanced"].map(diff => (
                      <button
                        key={diff}
                        onClick={() => setDifficultyFilter(diff)}
                        className={`px-2.5 py-1 rounded-full border transition-colors ${
                          difficultyFilter === diff
                            ? "bg-purple-500/25 border-purple-500 text-white"
                            : "border-borderMain text-textSubtle hover:border-borderMain hover:text-textPrimary"
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Horizontal scroll list of challenges */}
                <div className="flex gap-2.5 overflow-x-auto mt-3 pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
                  {filteredChallenges.map((c, idx) => {
                    const solved = solvedChallenges.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => setActiveChallengeId(c.id)}
                        className={`flex-shrink-0 px-4 py-3 rounded-2xl border text-left flex flex-col justify-between h-20 w-44 transition-all duration-200 ${
                          activeChallengeId === c.id
                            ? "bg-[#18111F] border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.15)] text-white"
                            : "bg-cardSubtle75 border-borderMain hover:border-borderMain text-textSecondary"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-mono text-textSubtle">#{String(idx + 1).padStart(2, '0')}</span>
                          {solved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <div className="truncate font-semibold text-xs pr-2">{c.title}</div>
                        <span className={`text-[9px] uppercase font-mono tracking-widest border rounded px-1.5 py-0.5 w-fit ${getDifficultyColor(c.difficulty)}`}>
                          {c.difficulty}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Task Details */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`border text-xs uppercase px-3 py-1 rounded-full font-mono tracking-widest ${getDifficultyColor(activeChallenge.difficulty)}`}>
                      {activeChallenge.difficulty}
                    </span>
                    <span className={`border text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${getCompanyColor(activeChallenge.company)}`}>
                      {activeChallenge.company}
                    </span>
                  </div>
                  {/* Timer UI */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-textSubtle border border-borderMain rounded-lg px-2.5 py-1 bg-subtleBg">
                    <Timer className="w-3.5 h-3.5 text-textSubtle" />
                    <span>{formatTime(elapsedSeconds)}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">{activeChallenge.title}</h2>
                  <div className="h-0.5 w-24 bg-purple-500/40 mt-2 rounded"></div>
                </div>

                {/* Persona Request Card */}
                <div className="rounded-2xl border border-borderMain bg-subtleBg/40 p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-zinc-600/40">
                    <Briefcase className="w-12 h-12" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase font-mono tracking-widest text-purple-400 font-semibold">Business Inquiry</span>
                    <span className="text-[10px] text-textSubtle">•</span>
                    <span className="text-xs text-textSubtle font-medium">{activeChallenge.persona}</span>
                  </div>
                  <p className="text-textPrimary font-medium leading-relaxed italic text-sm sm:text-base">
                    &ldquo;{activeChallenge.prompt}&rdquo;
                  </p>
                </div>

                {/* Schema Explorer */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-textSubtle flex items-center gap-2">
                    <Database className="w-3.5 h-3.5" /> Schema Explorer
                  </h3>
                  
                  <div className="space-y-2.5">
                    {activeChallenge.schemaTables.map(tblName => {
                      const schema = tableSchemas[tblName];
                      if (!schema) return null;
                      return (
                        <div key={tblName} className="border border-borderMain rounded-2xl bg-cardSubtle30 overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 bg-cardSubtle60 border-b border-borderMain">
                            <span className="font-mono text-sm font-semibold text-white flex items-center gap-2">
                              <span className="size-2 rounded-full bg-purple-500"></span>
                              {schema.name}
                            </span>
                            <button
                              onClick={() => handlePreviewTable(schema.name)}
                              className="text-[11px] font-mono tracking-widest text-purple-400 hover:text-purple-300 transition-colors uppercase"
                            >
                              👁 Preview
                            </button>
                          </div>

                          <div className="p-3 grid grid-cols-2 gap-2 text-xs font-mono">
                            {schema.columns.map(col => (
                              <div key={col.name} className="flex justify-between items-center bg-black/20 border border-borderMain rounded px-2.5 py-1.5">
                                <span className="text-textSecondary">{col.name}</span>
                                <span className="text-textSubtle text-[10px]">{col.type}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Hint Section */}
                <div className="border border-borderMain rounded-2xl bg-cardSubtle10 p-4">
                  <div className="flex items-center gap-2 mb-1.5 text-textSubtle">
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-xs uppercase font-mono tracking-wider font-semibold">Tutor Hint</span>
                  </div>
                  <p className="text-xs text-textSubtle leading-relaxed">{activeChallenge.hint}</p>
                </div>
              </div>
            </div>
          ) : activeTab === "achievements" ? (
            /* ACHIEVEMENTS TAB VIEW */
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400 animate-bounce" /> Unlocked Achievements
                </h2>
                <p className="text-xs text-textSubtle font-mono mt-1 uppercase">Practice SQL & earn custom badge achievements</p>
                <div className="h-0.5 w-24 bg-purple-500/40 mt-2 rounded"></div>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 gap-4">
                {badges.map(badge => {
                  const unlocked = checkBadgeUnlocked(badge);
                  const IconComponent = badge.icon;
                  return (
                    <div 
                      key={badge.id}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                        unlocked 
                          ? "bg-[#1C1427]/40 border-purple-500/50 shadow-[0_0_15px_rgba(124,58,237,0.08)]" 
                          : "bg-cardSubtle50 border-borderMain opacity-40 select-none"
                      }`}
                    >
                      <div className={`p-3 rounded-xl border ${
                        unlocked 
                          ? "bg-purple-500/10 border-purple-500/20 text-purple-400" 
                          : "bg-zinc-800 border-zinc-700 text-zinc-600"
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold ${unlocked ? "text-white" : "text-textSubtle"}`}>
                            {badge.title}
                          </h4>
                          {unlocked ? (
                            <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Unlock className="w-2.5 h-2.5" /> Unlocked
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 bg-zinc-800/40 border border-zinc-700/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> Locked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-textSubtle leading-relaxed pr-6">{badge.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeTab === "interview" ? (
            /* INTERVIEW CASE STUDIES TAB VIEW */
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-sidebarSubtle40">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400 animate-pulse" /> FAANG Case Studies
                </h2>
                <p className="text-xs text-textSubtle font-mono mt-1 uppercase">Learn SQL architecture & STAR interview responses</p>
                <div className="h-0.5 w-24 bg-purple-500/40 mt-2 rounded"></div>
              </div>

              {/* Case Studies Selector (Pill format) */}
              <div className="flex flex-col gap-2.5">
                {caseStudies.map(study => {
                  const isSelected = selectedCaseStudyId === study.id;
                  return (
                    <button
                      key={study.id}
                      onClick={() => setSelectedCaseStudyId(study.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-purple-500/10 border-purple-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.08)]"
                          : "bg-cardSubtle50 border-borderMain text-textSubtle hover:border-borderMain hover:text-zinc-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                          {study.company} &bull; {study.domain}
                        </span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                          study.difficulty === "Hard"
                            ? "text-rose-400 border-rose-500/20 bg-rose-500/5"
                            : "text-amber-400 border-amber-500/20 bg-amber-500/5"
                        }`}>
                          {study.difficulty}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold truncate">{study.title}</h4>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Active Case Study Panel */}
              {(() => {
                const activeStudy = caseStudies.find(c => c.id === selectedCaseStudyId) || caseStudies[0];
                return (
                  <div className="border border-borderMain rounded-2xl bg-cardSubtle20 p-5 space-y-5">
                    <div className="border-b border-borderMain pb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono text-textSubtle uppercase tracking-widest">STAR Schema Response</span>
                        <span className="text-xs font-mono text-purple-400 font-semibold">{activeStudy.domain}</span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">{activeStudy.title}</h3>
                    </div>

                    {/* S.T.A.R Sections */}
                    <div className="space-y-4 text-xs">
                      <div>
                        <span className="font-mono text-amber-400 uppercase tracking-wider font-bold block mb-1">S &mdash; Situation (Context)</span>
                        <p className="text-textSecondary leading-relaxed bg-black/10 p-3 rounded-lg border border-borderMain">{activeStudy.situation}</p>
                      </div>
                      <div>
                        <span className="font-mono text-sky-400 uppercase tracking-wider font-bold block mb-1">T &mdash; Task (Goal)</span>
                        <p className="text-textSecondary leading-relaxed bg-black/10 p-3 rounded-lg border border-borderMain">{activeStudy.task}</p>
                      </div>
                      <div>
                        <span className="font-mono text-purple-400 uppercase tracking-wider font-bold block mb-1">A &mdash; Action (SQL Plan)</span>
                        <p className="text-textSecondary leading-relaxed whitespace-pre-line bg-black/10 p-3 rounded-lg border border-borderMain">{activeStudy.action}</p>
                      </div>
                      <div>
                        <span className="font-mono text-emerald-400 uppercase tracking-wider font-bold block mb-1">R &mdash; Result (Business Impact)</span>
                        <p className="text-textSecondary leading-relaxed bg-black/10 p-3 rounded-lg border border-borderMain">{activeStudy.result}</p>
                      </div>
                    </div>

                    {/* Concepts Tag List */}
                    <div>
                      <span className="font-mono text-textSubtle text-[10px] uppercase tracking-wider block mb-2">Key Technical Concepts</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeStudy.concepts.map(tag => (
                          <span key={tag} className="text-[10px] font-mono text-textSecondary bg-subtleBg border border-borderMain rounded px-2.5 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Model SQL Query */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-textSubtle text-[10px] uppercase tracking-wider">Model SQL Dialect (PostgreSQL/Snowflake)</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(activeStudy.modelQuery);
                            setCopiedCaseStudyId(activeStudy.id);
                            setTimeout(() => setCopiedCaseStudyId(null), 2000);
                          }}
                          className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all"
                        >
                          {copiedCaseStudyId === activeStudy.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy Query
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[11px] font-mono p-4 rounded-xl border border-borderMain bg-black/40 text-purple-300 overflow-x-auto leading-relaxed max-h-[300px] overflow-y-auto">
                        <code>{activeStudy.modelQuery}</code>
                      </pre>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* TECH INTERVIEW Q&A TAB VIEW */
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-sidebarSubtle40">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-400 animate-pulse" /> Technical Interview Q&A
                </h2>
                <p className="text-xs text-textSubtle font-mono mt-1 uppercase">Review core SQL concepts and interview questions</p>
                <div className="h-0.5 w-24 bg-purple-500/40 mt-2 rounded"></div>
              </div>

              {/* Category-grouped Questions list */}
              <div className="space-y-6">
                {["Joins & Set Operators", "Aggregations & Filtering", "Window Functions & CTEs", "Optimization & Indexing", "Database Design & Architecture"].map((cat) => {
                  const catQuestions = interviewQuestions.filter(q => q.category === cat);
                  if (catQuestions.length === 0) return null;
                  
                  return (
                    <div key={cat} className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-textSubtle font-bold border-b border-borderMain pb-1">
                        {cat}
                      </h3>
                      
                      <div className="flex flex-col gap-2">
                        {catQuestions.map(q => {
                          const isSelected = selectedQaId === q.id;
                          return (
                            <div key={q.id} className="flex flex-col">
                              <button
                                onClick={() => setSelectedQaId(q.id)}
                                className={`text-left p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-2.5 ${
                                  isSelected
                                    ? "bg-purple-500/10 border-purple-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.08)]"
                                    : "bg-cardSubtle40 border-borderMain text-textSubtle hover:border-borderMain hover:text-zinc-200"
                                }`}
                              >
                                <span className="font-mono text-xs text-purple-400 font-semibold mt-0.5">{q.id}.</span>
                                <span className="text-sm font-bold leading-snug">{q.question}</span>
                              </button>

                              {/* expanded answer block below if selected */}
                              {isSelected && (
                                <div className="mt-2 ml-4 p-4 border border-borderMain bg-editorSubtle50 rounded-xl space-y-4">
                                  <div className="text-xs text-textSecondary whitespace-pre-line leading-relaxed">
                                    {q.explanation}
                                  </div>

                                  {/* keywords tags */}
                                  <div>
                                    <span className="font-mono text-textSubtle text-[10px] uppercase tracking-wider block mb-1.5">Key Terminology to Mention</span>
                                    <div className="flex flex-wrap gap-1.5">
                                      {q.keyKeywords.map(word => (
                                        <span key={word} className="text-[10px] font-mono text-purple-400 bg-purple-500/5 border border-purple-500/10 rounded px-2 py-0.5">
                                          {word}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Code Example block */}
                                  {q.codeExample && (
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className="font-mono text-textSubtle text-[10px] uppercase tracking-wider">Example SQL Snippet</span>
                                        <button
                                          onClick={() => {
                                            navigator.clipboard.writeText(q.codeExample || "");
                                            setCopiedQaQueryId(q.id);
                                            setTimeout(() => setCopiedQaQueryId(null), 2000);
                                          }}
                                          className="flex items-center gap-1.5 text-[9px] font-mono px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all"
                                        >
                                          {copiedQaQueryId === q.id ? (
                                            <>
                                              <Check className="w-3 h-3" /> Copied!
                                            </>
                                          ) : (
                                            <>
                                              <Copy className="w-3 h-3" /> Copy Example
                                            </>
                                          )}
                                        </button>
                                      </div>
                                      <pre className="text-[11px] font-mono p-3 rounded-lg border border-borderMain bg-black/40 text-purple-300 overflow-x-auto leading-relaxed">
                                        <code>{q.codeExample}</code>
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN (SQL Editor & Console) - 7 Cols */}
        <div className="lg:col-span-7 flex flex-col h-full overflow-hidden bg-black">
          
          {/* SQL Editor Header */}
          <div className="bg-headerSubtle90 border-b border-borderMain px-5 py-3 flex items-center justify-between">
            <span className="text-xs font-mono tracking-wider text-textSubtle">
              SQL Editor Console
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleResetCode}
                className="p-2 hover:bg-subtleBg rounded-lg text-textSubtle hover:text-textPrimary transition-colors"
                title="Reset Code"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className={`flex items-center gap-1.5 text-xs font-mono tracking-wider px-3 py-1.5 border rounded-lg transition-colors ${
                  showSolution 
                    ? "bg-purple-500/25 border-purple-500 text-white" 
                    : "border-borderMain hover:border-borderMain text-textSubtle hover:text-textPrimary"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{showSolution ? "Hide Answer" : "Reveal Answer"}</span>
              </button>
            </div>
          </div>

          {/* IDE Editor area */}
          <div className="flex-1 min-h-[200px] lg:min-h-0 relative flex flex-col">
            
            <textarea
              value={editorSql}
              onChange={(e) => handleEditorChange(e.target.value)}
              className="flex-1 w-full bg-bgMain text-textSecondary font-mono text-sm p-5 focus:outline-none resize-none border-b border-borderMain leading-relaxed shadow-inner"
              style={{ fontFamily: "'Fira Code', 'Courier New', monospace" }}
              placeholder="SELECT * FROM table..."
              spellCheck="false"
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault();
                  const start = e.currentTarget.selectionStart;
                  const end = e.currentTarget.selectionEnd;
                  const val = e.currentTarget.value;
                  handleEditorChange(val.substring(0, start) + "  " + val.substring(end));
                  setTimeout(() => {
                    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
                  }, 0);
                }
              }}
            />

            {/* Solution Drawer */}
            {showSolution && (
              <div className="absolute inset-0 bg-modalBg border-b border-borderMain p-6 overflow-y-auto z-10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm uppercase font-mono tracking-widest text-purple-400 font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Target Solution SQL
                    </h4>
                    <button 
                      onClick={() => setShowSolution(false)}
                      className="p-1 hover:bg-subtleBg rounded-full text-textSubtle hover:text-textPrimary"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="p-4 bg-black/40 border border-borderMain rounded-xl text-textPrimary font-mono text-xs overflow-x-auto whitespace-pre-wrap select-text leading-relaxed">
                    {activeChallenge.expectedQuery}
                  </pre>
                  <p className="mt-4 text-xs text-textSubtle leading-relaxed">
                    <strong>Business Rationale:</strong> This query structure evaluates exactly what the business requester needs by aggregating performance logs, grouping details correctly, and sorting outputs to bubbled-up outliers.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    handleEditorChange(activeChallenge.expectedQuery);
                    setShowSolution(false);
                  }}
                  className="mt-6 w-full text-xs font-mono uppercase tracking-wider py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-200 hover:scale-[1.01]"
                >
                  Copy Solution to Editor
                </button>
              </div>
            )}

            {/* Run overlay buttons */}
            <div className="absolute bottom-4 right-4 flex gap-3 z-0">
              <button
                onClick={handleRunQuery}
                className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 border border-borderMain shadow-lg"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Run Query</span>
              </button>
              
              <button
                onClick={handleSubmitAnswer}
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #B600A8 100%)',
                  boxShadow: '0 4px 15px rgba(124,58,237,0.3)'
                }}
                className="flex items-center gap-2 px-6 py-2.5 text-white rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border border-purple-400/25"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Submit Answer</span>
              </button>
            </div>
          </div>

          {/* BOTTOM COLUMN (Query Output Console) */}
          <div className="h-[280px] bg-headerSubtle85 border-t border-borderMain flex flex-col overflow-hidden">
            
            <div className="bg-headerMain px-5 py-2.5 border-b border-borderMain flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-textSubtle">Output Console</span>
              {queryResult?.success && queryResult.data && (
                <span className="text-[10px] font-mono text-textSubtle">
                  {queryResult.data.length} row(s) returned
                </span>
              )}
            </div>

            <div className="flex-1 overflow-auto p-4">
              
              {/* Grading Status Panel */}
              {isCorrect !== null && (
                <div className={`mb-4 p-4 border rounded-2xl flex items-start gap-3 animate-fade-in ${
                  isCorrect 
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
                    : "bg-rose-500/5 border-rose-500/20 text-rose-400"
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h5 className="font-semibold text-sm uppercase tracking-wide">
                      {isCorrect ? "Challenge Solved!" : "Submission Mismatch"}
                    </h5>
                    <p className="text-xs text-textSubtle mt-1 leading-relaxed">{gradeMessage}</p>
                  </div>
                </div>
              )}

              {/* Compilation Errors */}
              {queryResult && !queryResult.success && (
                <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl flex items-start gap-3 text-rose-400 font-mono text-xs">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold uppercase tracking-wider">SQL Engine Compilation Error</h5>
                    <pre className="mt-1 whitespace-pre-wrap leading-relaxed">{queryResult.error}</pre>
                  </div>
                </div>
              )}

              {!queryResult && (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
                  <Play className="w-8 h-8 opacity-40" />
                  <p className="text-xs uppercase tracking-widest font-mono">Run or Submit query to see output results</p>
                </div>
              )}

              {/* Results Grid Table */}
              {queryResult?.success && queryResult.data && (
                <div className="w-full">
                  {queryResult.data.length === 0 ? (
                    <div className="p-6 text-center text-xs text-textSubtle uppercase tracking-widest font-mono">
                      Query returned empty set (0 rows)
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-borderMain rounded-xl bg-black/20">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="bg-subtleBg border-b border-borderMain">
                            {Object.keys(queryResult.data[0]).map(colHeader => (
                              <th key={colHeader} className="px-4 py-2 text-textSubtle font-semibold border-r border-borderMain last:border-r-0">
                                {colHeader}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {queryResult.data.map((row, rowIdx) => (
                            <tr key={rowIdx} className="border-b border-borderMain last:border-b-0 hover:bg-subtleBg/40 transition-colors">
                              {Object.values(row).map((val: any, colIdx) => (
                                <td key={colIdx} className="px-4 py-2 border-r border-borderMain last:border-r-0 text-textSecondary select-text">
                                  {val === null || val === undefined ? <span className="text-zinc-600 italic">NULL</span> : String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* 4. Table Preview Modal */}
      {previewTableName && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-cardMain border border-borderMain rounded-[30px] w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-scale-up">
            
            <div className="px-6 py-4 bg-tableHeaderBg border-b border-borderMain flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-400" />
                <h3 className="font-mono text-sm font-semibold text-white uppercase">Table Preview: {previewTableName}</h3>
              </div>
              <button
                onClick={() => setPreviewTableName(null)}
                className="p-1 hover:bg-subtleBg rounded-full text-textSubtle hover:text-textPrimary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {previewData.length === 0 ? (
                <div className="p-8 text-center text-sm text-textSubtle font-mono uppercase tracking-widest">
                  No records found in this table
                </div>
              ) : (
                <div className="overflow-x-auto border border-borderMain rounded-xl bg-black/20">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-subtleBg border-b border-borderMain">
                        {Object.keys(previewData[0]).map(col => (
                          <th key={col} className="px-4 py-3 text-textSubtle font-semibold border-r border-borderMain last:border-r-0">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b border-borderMain last:border-b-0 hover:bg-subtleBg/40 transition-colors">
                          {Object.values(row).map((val: any, colIdx) => (
                            <td key={colIdx} className="px-4 py-2.5 border-r border-borderMain last:border-r-0 text-textSecondary select-text">
                              {val === null || val === undefined ? <span className="text-zinc-600 italic">NULL</span> : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-tableHeaderBg border-t border-borderMain flex justify-end">
              <button
                onClick={() => setPreviewTableName(null)}
                className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Custom Shield alert badge component for dispute challenges
function ShieldAlertBadge(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default App;
