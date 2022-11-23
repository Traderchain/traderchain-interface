import { VuiBox, VuiTypography } from "traderchain-ui";
import StatsTable from 'components/StatsTable';

export default function InvestorStats({ columns, rows }: any) {
  return (
    <VuiBox>
      <StatsTable columns={columns} rows={rows} />
    </VuiBox>
  );
}
