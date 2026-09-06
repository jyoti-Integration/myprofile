const projectDetails = {
  payments: { type: 'Payments infrastructure', title: 'Customer Info API for credit card & digital payments', copy: 'A real-time integration layer for digital and direct customer journeys, keeping billing, payment, and subscription renewal records synchronized across MuleSoft, Oracle Integration Cloud, and Zuora. AWS SQS and SNS decouple event processing for reliable delivery at scale.', stack: ['MuleSoft Anypoint', 'Oracle Integration Cloud', 'Zuora', 'AWS SQS', 'AWS SNS'] },
  reconciliation: { type: 'Applied AI', title: 'GenAI invoice-to-journal reconciliation', copy: 'An agentic workflow that uses LLMs and retrieval-augmented generation to match vendor invoices against GL entries through real-time Oracle Cloud queries, reducing manual reconciliation and posting errors.', stack: ['RAG', 'LLMs', 'Oracle Cloud', 'Agentic workflow'] },
  close: { type: 'Financial operations', title: 'High-frequency payment reconciliation', copy: 'A standalone OIC and VBCS application aggregating transaction records from Adyen and CyberSource, automating journal entry creation and cutting month-end close cycles by 60%.', stack: ['OIC', 'VBCS', 'Adyen', 'CyberSource'] },
  fraud: { type: 'Risk intelligence', title: 'Anomaly & fraud detection', copy: 'Event-driven flows monitor Salesforce and Zuora transactions in real time, triggering AI-based alerts that improve payment integrity and reduce suspicious or failed transactions.', stack: ['Salesforce', 'Zuora', 'Event monitoring', 'AI alerts'] },
  tax: { type: 'Quote-to-cash', title: 'Global tax & subscription automation', copy: 'A mission-critical pipeline synchronizing Salesforce, Zuora, and Oracle Fusion ERP for real-time subscription billing, currency automation, and multi-country tax compliance.', stack: ['Salesforce', 'Zuora', 'Oracle Fusion', 'Global tax'] },
  hire: { type: 'People systems', title: 'Intelligent hire-to-retire sync', copy: 'A bidirectional, event-driven sync between Workday and Oracle ERP that automates 90% of employee onboarding tasks while keeping payroll and benefits data reliable across systems.', stack: ['Workday', 'Oracle ERP', 'Event-driven', '90% automated'] }
};

const dialog = document.querySelector('#projectDialog');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogType = document.querySelector('#dialogType');
const dialogCopy = document.querySelector('#dialogCopy');
const dialogStack = document.querySelector('#dialogStack');

document.querySelectorAll('[data-project]').forEach((card) => {
  card.addEventListener('click', () => {
    const project = projectDetails[card.dataset.project];
    dialogType.textContent = project.type;
    dialogTitle.textContent = project.title;
    dialogCopy.textContent = project.copy;
    dialogStack.innerHTML = project.stack.map((item) => `<span>${item}</span>`).join('');
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.role').forEach((role) => role.classList.toggle('hidden', filter !== 'all' && !role.classList.contains(filter)));
  });
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const copyButton = document.querySelector('#copyEmail');
const toast = document.querySelector('.toast');
copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(copyButton.dataset.email);
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2200);
});
