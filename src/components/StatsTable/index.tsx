import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { VuiBox, VuiTypography } from "traderchain-ui";

export default function StatsTable({ columns, rows }: any) {
  const renderColumns = columns.map(({ name }: { name: string }, key: number) => {
    return (
      <VuiBox
        key={name}
        component="th"
        width="auto"
        pt={1.5}
        pb={1.25}
        pl={1}
        textAlign="left"
        fontSize="55%"
        color="text"
        opacity={0.7}
        borderBottom="1px solid rgb(45, 55, 72)"
      >
        {name.toUpperCase()}
      </VuiBox>
    );
  });
  
  const renderRows = rows.map((row: any, key: number) => {
    const tableRow = columns.map(({ name }: { name: string }) => {      
      let rowContent: any;
            
      if (name == "value") {
        rowContent = (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {row[name] || ''}
          </VuiTypography>
        );
      }
      else {
        rowContent = (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography variant="button" color="white" fontWeight="medium">
              {row[name]}
            </VuiTypography>
          </VuiBox>
        );
      }
      
      return (
        <VuiBox
          key={`row-${key}-${name}`}
          component="td"
          p={0.2}
          textAlign="left"
          borderBottom={key < rows.length - 1 ? "1px solid rgb(45, 55, 72)" : "none"}
        >
          <VuiTypography
            variant="button"
            fontWeight="regular"
            color="text"
          >
            {rowContent}
          </VuiTypography>
        </VuiBox>
      );
    });

    return <TableRow key={`row-${key}`}>{tableRow}</TableRow>;
  });
  
  return (
    <TableContainer sx={{ borderRadius: "0" }}>
      <Table>
        <VuiBox component="thead">
          <TableRow>{renderColumns}</TableRow>
        </VuiBox>
        <TableBody>{renderRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
