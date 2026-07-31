import React, { useState } from 'react';
import { Terminal, Copy, Check, FileCode, Server, Database, Container } from 'lucide-react';

export const TestAutomationDocsView: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopyCode = (code: string, sectionKey: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const javaSeleniumScript = `// WesternTrustBankTest.java
// Production-grade Selenium WebDriver Test Scenario for Western Trust Bank
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class WesternTrustBankTest {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final String APP_URL = "http://localhost:3000";

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void testCustomerLoginAndMoneyTransfer() {
        driver.get(APP_URL);

        // 1. Select Customer Persona & Login
        WebElement btnCustomerPersona = wait.until(ExpectedConditions.elementToBeClickable(By.id("btn-persona-customer")));
        btnCustomerPersona.click();

        WebElement inputUsername = driver.findElement(By.id("login-username-input"));
        Assert.assertEquals(inputUsername.getAttribute("value"), "john.doe");

        WebElement btnSubmitLogin = driver.findElement(By.id("btn-login-submit"));
        btnSubmitLogin.click();

        // 2. Pass OTP Verification
        WebElement inputOtp = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("input-otp-code")));
        inputOtp.sendKeys("123456");

        WebElement btnVerifyOtp = driver.findElement(By.id("btn-otp-verify"));
        btnVerifyOtp.click();

        // 3. Verify Dashboard Loads
        WebElement welcomeHeading = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("heading-dashboard-welcome")));
        Assert.assertTrue(welcomeHeading.getText().contains("Good day, John Doe"));

        // 4. Navigate to Money Transfers Module
        WebElement navTransfers = driver.findElement(By.id("btn-nav-transfers"));
        navTransfers.click();

        // 5. Fill Money Transfer Form
        WebElement inputAmount = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("input-transfer-amount")));
        inputAmount.clear();
        inputAmount.sendKeys("500.00");

        WebElement btnSubmitTransfer = driver.findElement(By.id("btn-transfer-submit"));
        btnSubmitTransfer.click();

        // 6. Assert Receipt Output
        WebElement receiptConfirmation = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("receipt-confirmation-card")));
        Assert.assertTrue(receiptConfirmation.isDisplayed(), "Money transfer receipt should be visible");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`;

  const pythonSeleniumScript = `# test_western_trust_bank.py
# Python pytest + Selenium automation scenario
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    driver.quit()

def test_login_and_chaos_flag_toggle(driver):
    wait = WebDriverWait(driver, 10)
    driver.get("http://localhost:3000")

    # Click Quick Select Customer
    wait.until(EC.element_to_be_clickable((By.ID, "btn-persona-customer"))).click()
    driver.find_element(By.ID, "btn-login-submit").click()

    # Enter OTP
    wait.until(EC.visibility_of_element_located((By.ID, "input-otp-code"))).send_keys("123456")
    driver.find_element(By.ID, "btn-otp-verify").click()

    # Navigate to Admin Chaos Portal
    wait.until(EC.element_to_be_clickable((By.ID, "btn-nav-admin"))).click()

    # Toggle Accessibility Defects
    a11y_btn = wait.until(EC.element_to_be_clickable((By.ID, "toggle-accessibility-bugs")))
    a11y_btn.click()
    assert "DEFECTS ACTIVE" in a11y_btn.text

    # Set 500ms API Latency
    latency_select = driver.find_element(By.ID, "select-api-latency")
    latency_select.send_keys("500ms")
`;

  const dockerComposeYml = `# docker-compose.yml
version: '3.8'

services:
  web-frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=postgresql://wtb_user:wtb_secure_pass@postgres-db:5432/western_trust_db
    depends_on:
      - postgres-db

  postgres-db:
    image: postgres:16-alpine
    container_name: wtb-postgres
    restart: always
    environment:
      POSTGRES_DB: western_trust_db
      POSTGRES_USER: wtb_user
      POSTGRES_PASSWORD: wtb_secure_pass
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

volumes:
  pgdata:
`;

  const postgresInitSql = `-- init.sql - PostgreSQL Schema for Western Trust Bank
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(50),
    user_role VARCHAR(30) NOT NULL,
    kyc_status VARCHAR(20) DEFAULT 'VERIFIED',
    credit_score INT DEFAULT 750,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bank_accounts (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id),
    account_number VARCHAR(30) UNIQUE NOT NULL,
    routing_number VARCHAR(20) NOT NULL DEFAULT '121000358',
    account_type VARCHAR(30) NOT NULL,
    balance NUMERIC(15,2) DEFAULT 0.00,
    available_balance NUMERIC(15,2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    iban VARCHAR(40) UNIQUE,
    interest_rate NUMERIC(5,2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(50) PRIMARY KEY,
    account_id VARCHAR(50) REFERENCES bank_accounts(id),
    tx_date TIMESTAMP NOT NULL,
    merchant VARCHAR(150) NOT NULL,
    category VARCHAR(50),
    amount NUMERIC(12,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'COMPLETED',
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    channel VARCHAR(20) DEFAULT 'ONLINE'
);
`;

  return (
    <div id="selenium-docs-view-container" data-testid="selenium-docs-view-container" className="space-y-4">
      {/* Header */}
      <div>
        <h1 id="heading-docs-title" data-testid="heading-docs-title" className="text-xl font-bold text-slate-900 tracking-tight">
          Test Automation Hub & Artifact Exporter
        </h1>
        <p id="subheading-docs" data-testid="subheading-docs" className="text-xs text-slate-500 mt-0.5">
          Copy production-ready Selenium scripts, Docker Compose files, and PostgreSQL schemas for enterprise test automation setups.
        </p>
      </div>

      <div className="space-y-4">
        {/* Section 1: Java Selenium WebDriver Code */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-[#002D72] font-bold text-xs">
              <FileCode className="w-4 h-4" />
              <span>Selenium WebDriver Java Test Script (Stable Element IDs)</span>
            </div>
            <button
              id="btn-copy-java-script"
              data-testid="btn-copy-java-script"
              onClick={() => handleCopyCode(javaSeleniumScript, 'JAVA')}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded text-xs font-bold flex items-center space-x-1 transition cursor-pointer"
            >
              {copiedSection === 'JAVA' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'JAVA' ? 'Copied Java Code' : 'Copy Java Script'}</span>
            </button>
          </div>

          <pre className="p-3.5 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-slate-200 overflow-x-auto max-h-80">
            {javaSeleniumScript}
          </pre>
        </div>

        {/* Section 2: Python pytest Script */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-emerald-800 font-bold text-xs">
              <Terminal className="w-4 h-4" />
              <span>Python pytest + Selenium Automation Scenario</span>
            </div>
            <button
              id="btn-copy-python-script"
              data-testid="btn-copy-python-script"
              onClick={() => handleCopyCode(pythonSeleniumScript, 'PYTHON')}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded text-xs font-bold flex items-center space-x-1 transition cursor-pointer"
            >
              {copiedSection === 'PYTHON' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'PYTHON' ? 'Copied Python Code' : 'Copy Python Script'}</span>
            </button>
          </div>

          <pre className="p-3.5 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-emerald-400 overflow-x-auto max-h-80">
            {pythonSeleniumScript}
          </pre>
        </div>

        {/* Section 3: Docker Compose & PostgreSQL Schema */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-amber-800 font-bold text-xs">
                <Container className="w-4 h-4" />
                <span>docker-compose.yml</span>
              </div>
              <button
                onClick={() => handleCopyCode(dockerComposeYml, 'DOCKER')}
                className="text-xs text-[#002D72] font-bold hover:underline cursor-pointer"
              >
                Copy YAML
              </button>
            </div>
            <pre className="p-3 bg-slate-900 border border-slate-800 rounded font-mono text-[11px] text-amber-300 overflow-x-auto max-h-60">
              {dockerComposeYml}
            </pre>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-purple-800 font-bold text-xs">
                <Database className="w-4 h-4" />
                <span>PostgreSQL init.sql Schema</span>
              </div>
              <button
                onClick={() => handleCopyCode(postgresInitSql, 'SQL')}
                className="text-xs text-[#002D72] font-bold hover:underline cursor-pointer"
              >
                Copy SQL
              </button>
            </div>
            <pre className="p-3 bg-slate-900 border border-slate-800 rounded font-mono text-[11px] text-purple-300 overflow-x-auto max-h-60">
              {postgresInitSql}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
