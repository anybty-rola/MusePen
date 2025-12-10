import React from 'react';
import { Sparkles, Zap, Smartphone, Globe, ShieldCheck, Fingerprint } from 'lucide-react';

export const ProposalView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 animate-fade-in font-serif text-ink-900 pb-24">
      
      {/* Header / Title Page */}
      <header className="text-center space-y-6 border-b border-ink-300 pb-12">
        <div className="inline-block px-4 py-1 rounded-full bg-accent-red/10 text-accent-red text-sm font-sans font-bold tracking-wide mb-4">
          2025 鸿蒙原生应用创作者激励计划申报方案
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-ink-900">
          妙笔·文心 <span className="text-2xl font-light text-ink-300 ml-2">MusePen</span>
        </h1>
        <p className="text-xl text-ink-800 italic">
          “妙笔生花，文心雕龙 —— 鸿蒙生态下的全场景AI创作伴侣”
        </p>
      </header>

      {/* 1. Product Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="w-6 h-6 text-accent-cyan" />
          1. 产品概览与鸿蒙适配价值
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-ink-100 space-y-4">
          <p className="leading-relaxed">
            <strong className="text-accent-cyan">为何选择鸿蒙？</strong> 
            网文创作不再局限于单一设备。MusePen 利用 HarmonyOS 的分布式能力，解决作者在手机记录灵感、平板梳理大纲、PC深度写作之间的割裂痛点。
            作为一款生产力工具，MusePen 深度适配 MatePad 的手写笔生态与 PC 的多窗口交互，让“灵感”在设备间无缝流转。
          </p>
        </div>
      </section>

      {/* 2. HarmonyOS Native Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-accent-cyan" />
          2. 鸿蒙原生特性结合点 (Key Differentiators)
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg border-l-4 border-accent-cyan shadow-sm">
            <h3 className="font-bold mb-2">元服务 (Atomic Services)</h3>
            <p className="text-sm text-ink-800">
              <span className="font-semibold">桌面灵感卡片：</span>
              无需打开APP，桌面卡片每日推送一个“生僻字”或“神话原型”，点击即可一键保存至素材库。利用 ArkTS 卡片轻量化渲染，零功耗唤醒创作欲。
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg border-l-4 border-accent-cyan shadow-sm">
            <h3 className="font-bold mb-2">分布式流转 (Distributed Hop)</h3>
            <p className="text-sm text-ink-800">
              <span className="font-semibold">接力创作：</span>
              在 Pura 70 上语音记录的灵感草稿，靠近 MatePad Pro 自动弹出“继续编辑”浮窗。利用 HarmonyOS 软总线技术，实现毫秒级状态同步。
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg border-l-4 border-accent-cyan shadow-sm">
            <h3 className="font-bold mb-2">小艺智能体 (Celia Agent)</h3>
            <p className="text-sm text-ink-800">
              <span className="font-semibold">系统级调用：</span>
              注册 Intent 接口。用户在任何界面唤醒小艺：“帮我给这个反派起个名字”，小艺直接调用 MusePen 的 naming 服务并以卡片形式返回结果。
            </p>
          </div>
        </div>
      </section>

      {/* 3. Pitch Deck / Incentive Plan */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-accent-cyan" />
          3. 2025 激励计划申报亮点
        </h2>
        <div className="space-y-4 font-sans text-sm text-ink-800">
          <div className="flex gap-4 items-start">
            <div className="bg-ink-200 p-2 rounded text-ink-900 font-bold shrink-0">创新性</div>
            <p>融合传统文学数据库与 LLM RAG 技术，首创“文化审计”功能，解决古言/历史类作者考据难的痛点。</p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-ink-200 p-2 rounded text-ink-900 font-bold shrink-0">生态贡献</div>
            <p>作为首批文字生产力工具，丰富鸿蒙平板生态，展示 ArkUI 在富文本编辑与复杂排版上的高性能表现。</p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-ink-200 p-2 rounded text-ink-900 font-bold shrink-0">商业模式</div>
            <p>Freemium 模式。基础功能免费，高级模型（如 GPT-4 级推理或多模态）采用订阅制 + 鸿蒙应用内支付 (IAP)。</p>
          </div>
        </div>
      </section>

      {/* 4. Development Roadmap */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-accent-cyan" />
          4. 0-1 开发路线图 (HarmonyOS Next)
        </h2>
        <div className="relative border-l-2 border-ink-300 ml-3 pl-8 space-y-8 py-4">
          <div className="relative">
            <div className="absolute -left-[41px] bg-accent-red w-5 h-5 rounded-full border-4 border-ink-50"></div>
            <h3 className="font-bold text-lg">Phase 1: Demo & Core (Month 1-2)</h3>
            <p className="text-sm">使用 DevEco Studio 构建 ArkUI 界面。接入 Account Kit 实现华为账号登录。完成“文化起名”核心算法封装。</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] bg-ink-800 w-5 h-5 rounded-full border-4 border-ink-50"></div>
            <h3 className="font-bold text-lg">Phase 2: Distribution & RAG (Month 3-4)</h3>
            <p className="text-sm">实现分布式数据管理 (Distributed Data Object)。部署向量数据库，上线“文化审计”功能。</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] bg-ink-300 w-5 h-5 rounded-full border-4 border-ink-50"></div>
            <h3 className="font-bold text-lg">Phase 3: Beta & Polish (Month 5)</h3>
            <p className="text-sm">小艺意图接入。UI 水墨动效优化 (Lottie/Canvas)。上架 AppGallery 开启公测。</p>
          </div>
        </div>
      </section>

      {/* Login & User System Architecture */}
      <section className="space-y-4 bg-ink-900 text-white p-6 rounded-xl border border-ink-800 shadow-xl">
        <h2 className="text-xl font-bold flex items-center gap-2 text-accent-cyan">
          <Fingerprint className="w-5 h-5" />
          新增规划：用户体系与 AI 初始化
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-ink-100">
            <div className="space-y-2">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">登录交互策略</h4>
                <ul className="list-disc list-inside space-y-1 text-ink-300">
                    <li><strong className="text-white">一键闪验 (Flash Verify):</strong> 主推本机号码一键登录，极大降低注册门槛，提升转化率。</li>
                    <li><strong className="text-white">HarmonyOS Account Kit:</strong> 接入华为账号，这是实现“跨端流转”的唯一钥匙 (Key Identifier)。</li>
                    <li><strong className="text-white">WeChat:</strong> 生态连接器，用于后期作品分享至朋友圈及文档导出。</li>
                </ul>
            </div>
            <div className="space-y-2">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">AI Cold Start (冷启动)</h4>
                <p className="text-ink-300">
                    设计了独特的 <strong className="text-white">Onboarding 向导</strong>。用户登录后需选择创作领域（如：玄幻/古言），系统自动挂载对应的 <strong className="text-accent-cyan">RAG 知识库 (Vector DB)</strong>。
                    同时区分“考据党”与“创意党”角色，动态调整 System Prompt 的温度值 (Temperature)。
                </p>
            </div>
        </div>
      </section>

    </div>
  );
};
