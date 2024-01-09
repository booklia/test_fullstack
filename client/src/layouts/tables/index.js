/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

import { useEffect, useState, useCallback } from "react";
import OperationsComponent from "./components/OperationsComponent";

function Tables() {
  const [ordersRowData, setOrdersRowData] = useState([]);
  const [ordersColDefs, setOrdersColDefs] = useState([]);
  const [usersColDefs, setUsersColDefs] = useState([]);

  useEffect(() => {
    (async () => {
      const responseOrders = await fetch("http://localhost:3001/orders");
      const responseUser = await fetch(
        "http://localhost:3001/users?page=1&perPage=1"
      );
      const orders = await responseOrders.json();
      const user = await responseUser.json();
      if (orders && user.users) {
        setOrdersColDefs(Object.keys(orders[0]).map((el) => ({ field: el })));
        setOrdersRowData(
          orders.map((el) => ({
            ...el,
            order_date: el.order_date
              ? el.order_date.split("T")[0]
              : el.order_date,
          }))
        );
        setUsersColDefs(
          Object.keys(user.users[0]).map((el) => ({ field: el }))
        );
      }
    })();
  }, []);

  const onGridReady = useCallback((params) => {
    const dataSource = {
      rowCount: undefined,
      getRows: async (params) => {
        const responseUsers = await fetch(
          `http://localhost:3001/users?page=${
            Math.floor(params.startRow / 5) + 1
          }&perPage=5`
        );
        const data = await responseUsers.json();
        if (data.users) {
          data.users = data.users.map((el) => ({
            ...el,
            registration_date: el.registration_date
              ? el.registration_date.split("T")[0]
              : el.registration_date,
          }));
        }
        let lastRow = -1;
        if (data.meta.totalItems < params.endRow - params.startRow) {
          lastRow = data.users.length + params.startRow;
        }
        params.successCallback(data.users, lastRow);
      },
    };
    params.api.setGridOption("datasource", dataSource);
  }, []);

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Orders Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <OperationsComponent
                  setOrders={setOrdersRowData}
                  orders={ordersRowData}
                />
                <div className="ag-theme-quartz" style={{ height: 250 }}>
                  <AgGridReact
                    rowData={ordersRowData}
                    columnDefs={ordersColDefs}
                  />
                </div>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <div className="ag-theme-quartz" style={{ height: 250 }}>
                  <AgGridReact
                    columnDefs={usersColDefs}
                    rowBuffer={0}
                    rowModelType={"infinite"}
                    cacheBlockSize={5}
                    cacheOverflowSize={2}
                    maxConcurrentDatasourceRequests={1}
                    maxBlocksInCache={5}
                    onGridReady={onGridReady}
                  />
                </div>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
