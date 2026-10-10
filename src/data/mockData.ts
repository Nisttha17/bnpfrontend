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
    complexity: 'Basic',
    description: 'Generate unique package IDs by concatenating asset class short code...',
    status: 'Completed',
    date: '10 Oct 2026',
    fullDetails:
      'Generate unique package IDs by concatenating asset class short code, execution timestamp, and broker LEI for cross-border multi-leg derivative transactions.',
    sourceDoc: 'ESMA Guidelines – Article 12.3',
    page: 24,
    relevantClause:
      '“The trading venue shall ensure accurate ... timestamp of each trade lifecycle event.”',
    impactExplanation:
      'The proposed change to event timestamp field aligns with the requirement. No conflict detected.',
    recommendation: 'Proceed with the change.',
  },
  {
    id: 'CR-002',
    srNo: 'CR-002',
    complexity: 'Basic',
    description: 'Update the event timestamp field to report the exact timestamp ...',
    status: 'In Progress',
    date: '09 Oct 2026',
    fullDetails:
      'Update the event timestamp field to report the exact timestamp in UTC with microsecond granularity to comply with high-frequency order book tracking standards.',
    sourceDoc: 'RTS 25 Clock Synchronization – Article 4',
    page: 12,
    relevantClause:
      '“Operators of trading venues and their members or participants shall synchronize the business clocks they use to record the date and time of any reportable event to UTC with divergence under 100 microseconds.”',
    impactExplanation:
      'Timestamp precision matches RTS 25, however field format update causes potential validation mismatches in EU and UK legacy reporting gateways.',
    recommendation: 'Verify backward compatibility with regional gateway adapters before final deployment.',
  },
  {
    id: 'CR-003',
    srNo: 'CR-003',
    complexity: 'Medium',
    description: 'Modify the trade ID length to support up to 64 characters...',
    status: 'Pending',
    date: '08 Oct 2026',
    fullDetails:
      'Modify the trade ID length to support up to 64 characters for global Unique Trade Identifier (UTI) harmonization across swaps and repos.',
    sourceDoc: 'CFTC Part 43 / 45 Real-Time Reporting Specs',
    page: 58,
    relevantClause:
      '“The Unique Swap Identifier (USI) and Unique Trade Identifier (UTI) must conform to CPMI-IOSCO Technical Guidance with up to 52 alphanumeric characters.”',
    impactExplanation:
      'Increasing length to 64 characters exceeds legacy 52-character fixed-length storage in Dodd-Frank transaction pipelines.',
    recommendation: 'Review downstream intermediary mapping and truncate excess padding where appropriate.',
  },
  {
    id: 'CR-004',
    srNo: 'CR-004',
    complexity: 'Advanced',
    description: 'Introduce a new field for regional classification...',
    status: 'Pending',
    date: '07 Oct 2026',
    fullDetails:
      'Introduce a new field for regional classification using ISO 3166-1 alpha-2 standard to support multi-regime reporting segregation for Asian and European counterparties.',
    sourceDoc: 'MAS Notice 610 / SFTR Article 4 Cross-Border Rules',
    page: 81,
    relevantClause:
      '“Reporting entities shall categorize geographical location based on ISO 3166-1 alpha-2 standards and clearly separate domestic from cross-border counterparties.”',
    impactExplanation:
      'Regional code alignment meets MAS requirements; secondary audit needed for UK FCA cross-border equivalence rules post-Brexit.',
    recommendation: 'Proceed with jurisdictional cross-mapping verification.',
  },
];

export const initialAssessments: AssessmentItem[] = [
  {
    id: 'ASM-101',
    dateTime: '10 Oct 2026, 10:24 AM',
    requestId: 'CR-002',
    status: 'In Progress',
    summary: '2 conflicts detected (EU, UK)',
  },
  {
    id: 'ASM-102',
    dateTime: '09 Oct 2026, 06:18 PM',
    requestId: 'CR-001',
    status: 'Completed',
    summary: 'No conflicts. All clear.',
  },
  {
    id: 'ASM-103',
    dateTime: '08 Oct 2026, 03:12 PM',
    requestId: 'CR-003',
    status: 'Needs Review',
    summary: '1 jurisdiction requires review.',
  },
  {
    id: 'ASM-104',
    dateTime: '07 Oct 2026, 11:45 AM',
    requestId: 'CR-004',
    status: 'Pending',
    summary: 'Evaluation queued for multi-jurisdiction matrix.',
  },
];

export const mockNotifications = [
  {
    id: 'notif-1',
    title: 'Assessment Complete for CR-001',
    description: 'All 6 regulatory jurisdictions evaluated. Zero regulatory conflicts identified.',
    time: '15 mins ago',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'Conflict Detected: MiFID II & Dodd-Frank',
    description: 'CR-002 flagged for clock synchronization variance between EU RTS 25 and US CFTC Part 43.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'notif-3',
    title: 'ESMA Regulatory Rule Update Published',
    description: 'ESMA RTS 22 Article 12 revision uploaded to reference repository.',
    time: 'Yesterday',
    unread: false,
  },
];
