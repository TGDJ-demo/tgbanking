import React from 'react';
import { useBank } from '../context/BankContext';
import {
  ShieldAlert,
  Zap,
  Activity,
  AlertTriangle,
  EyeOff,
  Code,
  Lock,
  Cpu,
  Users,
  Terminal,
  Server,
  RefreshCw,
} from 'lucide-react';

export const AdminPortalView: React.FC = () => {
  const { featureFlags, updateFeatureFlags, auditLogs, DEMO_PERSONAS, addToast } = useBank();

  return (
    <div id="admin-portal-container" data-testid="admin-portal-container" className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-lg border border-slate-200 shadow-sm text-slate-900">
        <div>
          <div className="flex items-center space-x-1.5 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Chaos Test Engine & System Admin Portal</span>
          </div>
          <h1 id="heading-admin-title" data-testid="heading-admin-title" className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">
            Test Automation Chaos Tower
          </h1>
          <p id="subheading-admin" data-testid="subheading-admin" className="text-xs text-slate-600 mt-0.5">
            Inject real-time defects, latency, accessibility failures, and HTTP errors to validate self-healing test automation scripts.
          </p>
        </div>

        <button
          id="btn-reset-all-flags"
          data-testid="btn-reset-all-flags"
          onClick={() => {
            updateFeatureFlags({
              accessibilityDefects: false,
              apiLatencyMs: 0,
              randomApiFailures: false,
              visualBugs: false,
              weakSecurityMode: false,
              heavyDomMode: false,
              brokenWorkflows: false,
            });
            addToast({ type: 'success', title: 'System Normal', message: 'All chaos defect flags reset to pristine enterprise mode.' });
          }}
          className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded transition flex items-center space-x-1.5 cursor-pointer shadow-xs shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Chaos Flags</span>
        </button>
      </div>

      {/* Feature Flags Grid */}
      <div id="grid-feature-flags" data-testid="grid-feature-flags" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* 1. Accessibility Defects Toggle */}
        <div id="card-flag-accessibility" data-testid="card-flag-accessibility" className="p-4 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-amber-800 uppercase">Accessibility Defect Injector</span>
            <EyeOff className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strips ARIA labels, image ALT tags, duplicate IDs, and degrades color contrast WCAG AA standards for accessibility testing.
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <span className="text-xs text-slate-700 font-bold">Missing ARIA / Poor Contrast</span>
            <button
              id="toggle-accessibility-bugs"
              data-testid="toggle-accessibility-bugs"
              onClick={() => updateFeatureFlags({ accessibilityDefects: !featureFlags.accessibilityDefects })}
              className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer border ${
                featureFlags.accessibilityDefects ? 'bg-amber-600 border-amber-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              {featureFlags.accessibilityDefects ? 'DEFECTS ACTIVE' : 'DISABLED'}
            </button>
          </div>
        </div>

        {/* 2. Network Latency Injector */}
        <div id="card-flag-latency" data-testid="card-flag-latency" className="p-4 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#002D72] uppercase">Mock Network Latency</span>
            <Zap className="w-4 h-4 text-[#002D72]" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Introduces artificial backend server delay to test Selenium explicit waits and timeout thresholds.
          </p>
          <div className="pt-2 border-t border-slate-200">
            <label className="block text-[10px] font-bold text-slate-600 mb-1">Injected Delay (Ms)</label>
            <select
              id="select-api-latency"
              data-testid="select-api-latency"
              value={featureFlags.apiLatencyMs}
              onChange={(e) => updateFeatureFlags({ apiLatencyMs: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#002D72]"
            >
              <option value={0}>0ms (Instant Normal)</option>
              <option value={100}>100ms (Fast Network)</option>
              <option value={500}>500ms (Moderate Latency)</option>
              <option value={2000}>2,000ms (2s Slow Response)</option>
              <option value={5000}>5,000ms (5s Extreme Timeout)</option>
            </select>
          </div>
        </div>

        {/* 3. Random API Failure Injector */}
        <div id="card-flag-failures" data-testid="card-flag-failures" className="p-4 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-red-700 uppercase">HTTP API Error Simulator</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Injects random HTTP error status codes (400, 403, 500, 502, 503) to test API retry logic and self-healing resilience.
          </p>
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-700 font-bold">Failure Injection</span>
              <button
                id="toggle-random-errors"
                data-testid="toggle-random-errors"
                onClick={() => updateFeatureFlags({ randomApiFailures: !featureFlags.randomApiFailures })}
                className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer border ${
                  featureFlags.randomApiFailures ? 'bg-red-700 border-red-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                {featureFlags.randomApiFailures ? 'ACTIVE' : 'OFF'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                id="select-error-code"
                data-testid="select-error-code"
                value={featureFlags.injectedErrorCode}
                onChange={(e) => updateFeatureFlags({ injectedErrorCode: Number(e.target.value) })}
                className="bg-slate-50 border border-slate-300 rounded p-1 text-xs text-slate-900 font-mono"
              >
                <option value={500}>HTTP 500 Server Error</option>
                <option value={403}>HTTP 403 Forbidden</option>
                <option value={404}>HTTP 404 Not Found</option>
                <option value={429}>HTTP 429 Rate Limit</option>
                <option value={502}>HTTP 502 Bad Gateway</option>
              </select>

              <select
                id="select-failure-rate"
                data-testid="select-failure-rate"
                value={featureFlags.failureRatePercent}
                onChange={(e) => updateFeatureFlags({ failureRatePercent: Number(e.target.value) })}
                className="bg-slate-50 border border-slate-300 rounded p-1 text-xs text-slate-900 font-mono"
              >
                <option value={20}>20% Failure Rate</option>
                <option value={50}>50% Failure Rate</option>
                <option value={100}>100% Always Fail</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Visual Regression Bugs */}
        <div id="card-flag-visual" data-testid="card-flag-visual" className="p-4 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-purple-800 uppercase">Visual Regression Shift</span>
            <Activity className="w-4 h-4 text-purple-700" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Misaligns buttons, shifts margins, and overlaps text elements to test Visual AI pixel-diff tools (Applitools / Percy).
          </p>
          <div className="flex justify-between items-center pt-2 border-t border-slate-200">
            <span className="text-xs text-slate-700 font-bold">Layout Displacement</span>
            <button
              id="toggle-visual-bugs"
              data-testid="toggle-visual-bugs"
              onClick={() => updateFeatureFlags({ visualBugs: !featureFlags.visualBugs })}
              className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer border ${
                featureFlags.visualBugs ? 'bg-purple-700 border-purple-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              {featureFlags.visualBugs ? 'SHIFT ACTIVE' : 'NORMAL'}
            </button>
          </div>
        </div>

        {/* 5. Weak Security Mode */}
        <div id="card-flag-security" data-testid="card-flag-security" className="p-4 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-emerald-800 uppercase">Security Flaws Simulator</span>
            <Lock className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Relaxes CSP headers, password strength rules, and simulates OWASP vulnerability tests for DAST tools.
          </p>
          <div className="flex justify-between items-center pt-2 border-t border-slate-200">
            <span className="text-xs text-slate-700 font-bold">Weak CSP / Passwords</span>
            <button
              id="toggle-weak-security"
              data-testid="toggle-weak-security"
              onClick={() => updateFeatureFlags({ weakSecurityMode: !featureFlags.weakSecurityMode })}
              className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer border ${
                featureFlags.weakSecurityMode ? 'bg-emerald-700 border-emerald-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              {featureFlags.weakSecurityMode ? 'INJECTED' : 'ENFORCED'}
            </button>
          </div>
        </div>

        {/* 6. Heavy DOM Performance Mode */}
        <div id="card-flag-heavydom" data-testid="card-flag-heavydom" className="p-4 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-sky-800 uppercase">Heavy DOM Performance Stress</span>
            <Cpu className="w-4 h-4 text-sky-700" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Renders 2,000 hidden DOM nodes to test Lighthouse, Web Vitals, and browser memory leak profiles.
          </p>
          <div className="flex justify-between items-center pt-2 border-t border-slate-200">
            <span className="text-xs text-slate-700 font-bold">2,000 Extra DOM Elements</span>
            <button
              id="toggle-heavy-dom"
              data-testid="toggle-heavy-dom"
              onClick={() => updateFeatureFlags({ heavyDomMode: !featureFlags.heavyDomMode })}
              className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer border ${
                featureFlags.heavyDomMode ? 'bg-sky-700 border-sky-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              {featureFlags.heavyDomMode ? 'STRESS ACTIVE' : 'LIGHTWEIGHT'}
            </button>
          </div>
        </div>
      </div>

      {/* Live REST API Audit Log Stream Table */}
      <div id="table-audit-logs-container" data-testid="table-audit-logs-container" className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden space-y-2.5 p-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <h3 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
            <Terminal className="w-4 h-4 text-emerald-700" />
            <span>Live REST API Request Audit Logs & Correlation IDs ({auditLogs.length})</span>
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">X-Correlation-ID Filterable</span>
        </div>

        <div className="overflow-x-auto">
          <table id="table-api-audit-logs" data-testid="table-api-audit-logs" className="w-full text-left text-xs text-slate-800">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-mono font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-2.5">Correlation ID / Time</th>
                <th className="p-2.5">Method & Endpoint</th>
                <th className="p-2.5">HTTP Status</th>
                <th className="p-2.5">Latency</th>
                <th className="p-2.5">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {auditLogs.slice(0, 8).map((log) => (
                <tr key={log.id} id={`audit-log-row-${log.id}`} data-testid={`audit-log-row-${log.id}`} className="hover:bg-slate-50">
                  <td className="p-2.5">
                    <div className="text-[#002D72] font-bold">{log.correlationId}</div>
                    <div className="text-[10px] text-slate-500">{log.timestamp.split('T')[1].slice(0, 8)}</div>
                  </td>
                  <td className="p-2.5">
                    <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${log.method === 'GET' ? 'bg-blue-50 text-[#002D72] border border-blue-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}>
                      {log.method}
                    </span>{' '}
                    <span className="text-slate-900 font-bold">{log.endpoint}</span>
                  </td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${log.statusCode < 300 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                      {log.statusCode}
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-700">{log.latencyMs}ms</td>
                  <td className="p-2.5 text-slate-500">{log.clientIp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
