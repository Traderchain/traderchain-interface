import { VuiBox, VuiTypography } from "traderchain-ui";
import StatsTable from 'components/StatsTable';

export default function FundStats({ columns, rows }: any) {
  return (
    <VuiBox>
      <StatsTable columns={columns} rows={rows} />
    </VuiBox>
  );
}
