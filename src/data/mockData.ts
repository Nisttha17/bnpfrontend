import { ChangeRequest, MetricSummary, AssessmentItem, JurisdictionMatrixRow } from '../types';

export const initialMetrics: MetricSummary = {
  totalChangeRequests: 24,
  totalChangeRequestsTrend: '+2 this week',
  conflictsDetected: 8,
  conflictsTrend: '+1 this week',
  needsHumanReview: 5,
  reviewTrend: '-1 this week',
  regulationsChecked: 12,
  regulationsTrend: '+3 this week',
};

export const defaultMatrixRows: JurisdictionMatrixRow[] = [
  {
    jurisdiction: 'EU',
    mifid: 'Conflict',
    emir: 'Clear',
    sftr: 'Review',
    doddFrank: 'Conflict',
    ukFca: 'Clear',
    mas: 'Clear',
  },
  {
    jurisdiction: 'UK',
    mifid: 'Conflict',
    emir: 'Clear',
    sftr: 'Clear',
    doddFrank: 'Review',
    ukFca: 'Clear',
    mas: 'Clear',
  },
  {
    jurisdiction: 'US',
    mifid: 'Clear',
    emir: 'Review',
    sftr: 'Clear',
    doddFrank: 'Clear',
    ukFca: 'Clear',
    mas: 'Clear',
  },
  {
    jurisdiction: 'Singapore',
    mifid: 'Clear',
    emir: 'Clear',
    sftr: 'Clear',
    doddFrank: 'Clear',
    ukFca: 'Clear',
    mas: 'Review',
  },
];

export const initialChangeRequests: ChangeRequest[] = [
  {
    id: 'CR-001',
    srNo: 'CR-001',
    description: 'Update trade event timestamps',
    status: 'Completed',
    date: '10 Oct 2026',
    fullDetails:
      'Update trade event timestamp fields to microsecond resolution for high-frequency algorithmic trade tracking and audit trail synchronization.',
    sourceDoc: 'ESMA RTS 25 / ASIC CP 334 – Clause 4.2',
    page: 24,
    relevantClause:
      '“The trading venue shall ensure accurate ... timestamp of each trade lifecycle event with microsecond synchronization.”',
    impactExplanation:
      'The proposed change impacts ASIC and MAS reporting rules; no impact on EMIR, UKEMIR, or HKMA reporting timelines.',
    recommendation: 'Proceed with the change. Clear evidence mapped.',
    regulatoryImpacts: {
      EMIR: 'NO',
      UKEMIR: 'NO',
      ASIC: 'YES',
      MAS: 'YES',
      HKMA: 'NO',
    },
  },
  {
    id: 'CR-002',
    srNo: 'CR-002',
    description: 'Modify counterparty details',
    status: 'In Progress',
    date: '09 Oct 2026',
    fullDetails:
      'Modify counterparty legal entity identifier (LEI) cache and natural person identifier attributes for cross-border swap dealers.',
    sourceDoc: 'MAS Notice 610 / ASIC Derivative Transaction Rules',
    page: 12,
    relevantClause:
      '“Reporting entities must capture natural person identifiers and updated LEI validation status for all active counterparties.”',
    impactExplanation:
      'Requires updated counterparty validation across ASIC, MAS, and HKMA regimes. No impact on EMIR or UKEMIR schemas.',
    recommendation: 'Verify backward compatibility with regional gateway adapters before final deployment.',
    regulatoryImpacts: {
      EMIR: 'NO',
      UKEMIR: 'NO',
      ASIC: 'YES',
      MAS: 'YES',
      HKMA: 'YES',
    },
  },
  {
    id: 'CR-003',
    srNo: 'CR-003',
    description: 'Change reporting fields',
    status: 'Pending',
    date: '08 Oct 2026',
    fullDetails:
      'Change trade reporting fields to support CPMI-IOSCO Unique Product Identifier (UPI) and revised technical guidance.',
    sourceDoc: 'EMIR Refit Validation Rules / UKEMIR Policy Statement',
    page: 58,
    relevantClause:
      '“Mandatory reporting fields updated to CPMI-IOSCO UPI and UTI standards across OTC derivative registries.”',
    impactExplanation:
      'Direct impact on EMIR, UKEMIR, and MAS trade repository schemas. No impact on ASIC or HKMA.',
    recommendation: 'Review downstream intermediary mapping and truncate excess padding where appropriate.',
    regulatoryImpacts: {
      EMIR: 'YES',
      UKEMIR: 'YES',
      ASIC: 'NO',
      MAS: 'YES',
      HKMA: 'NO',
    },
  },
  {
    id: 'CR-004',
    srNo: 'CR-004',
    description: 'Add product type',
    status: 'Pending',
    date: '07 Oct 2026',
    fullDetails:
      'Add bespoke structured commodity swap product types to asset categorization taxonomies.',
    sourceDoc: 'UK EMIR Refit Annex I / ASIC Rule 2.2.1',
    page: 81,
    relevantClause:
      '“Product classification must conform to CFI codes with additional bespoke OTC derivative categories.”',
    impactExplanation:
      'Impacts UKEMIR, ASIC, and HKMA derivative taxonomies. No impact on EMIR or MAS.',
    recommendation: 'Proceed with jurisdictional cross-mapping verification.',
    regulatoryImpacts: {
      EMIR: 'NO',
      UKEMIR: 'YES',
      ASIC: 'YES',
      MAS: 'NO',
      HKMA: 'YES',
    },
  },
  {
    id: 'CR-005',
    srNo: 'CR-005',
    description: 'Remove obsolete field',
    status: 'Completed',
    date: '06 Oct 2026',
    fullDetails:
      'Remove legacy clearing broker indicator flag decommissioned under regulatory reporting harmonization.',
    sourceDoc: 'EMIR Technical Standards (EU 2022/1855) / MAS Circular',
    page: 35,
    relevantClause:
      '“Legacy clearing indicator flag decommissioned in favor of centralized clearing counterparty LEI.”',
    impactExplanation:
      'Impacts EMIR and MAS feeds. No impact on UKEMIR, ASIC, or HKMA.',
    recommendation: 'Decommissioning approved. Clear evidence provided.',
    regulatoryImpacts: {
      EMIR: 'YES',
      UKEMIR: 'NO',
      ASIC: 'NO',
      MAS: 'YES',
      HKMA: 'NO',
    },
  },
  {
    id: 'CR-006',
    srNo: 'CR-006',
    description: 'Update validation rules',
    status: 'In Progress',
    date: '05 Oct 2026',
    fullDetails:
      'Update submission validation engine to reject non-conforming collateral valuation timestamps and collateral haircuts.',
    sourceDoc: 'HKMA & ASIC Technical Guidance / EMIR Refit',
    page: 47,
    relevantClause:
      '“Validation rules enforced at submission gateway rejecting non-compliant collateral valuation timestamps.”',
    impactExplanation:
      'Impacts EMIR, UKEMIR, ASIC, and HKMA submission gateways. No impact on MAS.',
    recommendation: 'Comprehensive test suite validation required prior to rollout.',
    regulatoryImpacts: {
      EMIR: 'YES',
      UKEMIR: 'YES',
      ASIC: 'YES',
      MAS: 'NO',
      HKMA: 'YES',
    },
  },
  {
    id: 'CR-007',
    srNo: 'CR-007',
    description: 'Revise settlement instructions',
    status: 'Pending',
    date: '04 Oct 2026',
    fullDetails:
      'Revise automated settlement instruction messaging to align with ISO 20022 MX cash account format.',
    sourceDoc: 'UK FCA Handbook / MAS Securities and Futures Regulations',
    page: 63,
    relevantClause:
      '“Settlement instruction messaging must provide standard SWIFT BIC and cash account identifier.”',
    impactExplanation:
      'Impacts UKEMIR, MAS, and HKMA regimes. No impact on EMIR or ASIC.',
    recommendation: 'Review settlement routing before finalizing implementation.',
    regulatoryImpacts: {
      EMIR: 'NO',
      UKEMIR: 'YES',
      ASIC: 'NO',
      MAS: 'YES',
      HKMA: 'YES',
    },
  },
  {
    id: 'CR-008',
    srNo: 'CR-008',
    description: 'Include additional asset class',
    status: 'Pending',
    date: '03 Oct 2026',
    fullDetails:
      'Include cryptocurrency index derivatives and environmental commodity units in trade reporting scope.',
    sourceDoc: 'EMIR Refit Scope / ASIC OTC Derivative Regulations',
    page: 92,
    relevantClause:
      '“Commodity derivative and index derivatives classified under mandatory reportable transaction scope.”',
    impactExplanation:
      'Impacts EMIR and ASIC reporting pipelines. No impact on UKEMIR, MAS, or HKMA.',
    recommendation: 'Scope alignment verified for designated asset sub-classes.',
    regulatoryImpacts: {
      EMIR: 'YES',
      UKEMIR: 'NO',
      ASIC: 'YES',
      MAS: 'NO',
      HKMA: 'NO',
    },
  },
];

export const initialAssessments: AssessmentItem[] = [
  {
    id: 'ASM-101',
    dateTime: '10 Oct 2026, 10:24 AM',
    requestId: 'CR-001',
    status: 'Completed',
    summary: '2 regulations impacted (ASIC, MAS). Evidence verified.',
  },
  {
    id: 'ASM-102',
    dateTime: '09 Oct 2026, 06:18 PM',
    requestId: 'CR-002',
    status: 'In Progress',
    summary: '3 regulations impacted (ASIC, MAS, HKMA).',
  },
  {
    id: 'ASM-103',
    dateTime: '08 Oct 2026, 03:12 PM',
    requestId: 'CR-003',
    status: 'Needs Review',
    summary: '3 regulations impacted (EMIR, UKEMIR, MAS).',
  },
  {
    id: 'ASM-104',
    dateTime: '07 Oct 2026, 11:45 AM',
    requestId: 'CR-006',
    status: 'Pending',
    summary: 'Broad gateway impact across 4 regulations.',
  },
];

export const mockNotifications = [
  {
    id: 'notif-1',
    title: 'Assessment Complete for CR-001',
    description: 'Evaluated against EMIR, UKEMIR, ASIC, MAS, HKMA. ASIC and MAS impacted.',
    time: '15 mins ago',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'Heatmap Impact Triggered: CR-006',
    description: 'CR-006 affects 4 regulatory reporting frameworks including EMIR and HKMA.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'notif-3',
    title: 'Regulatory Rule Reference Update',
    description: 'Updated ASIC CP 334 and MAS Notice 610 guidelines uploaded to repository.',
    time: 'Yesterday',
    unread: false,
  },
];
