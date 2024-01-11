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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import { useEffect, useState } from "react";

function Dashboard() {
  const [ordersCount, setOrders] = useState("");
  const [revenue, setRevenue] = useState("");
  const [usersOrdered, setUsersOrdered] = useState("");
  const [salesDaily, setSalesDaily] = useState({});
  const [usersDaily, setUsersDaily] = useState({});

  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3001/get_dashboard_info");
        const json = await res.json();
        setOrders(json.ordersCountWeek[0].order_count);
        setRevenue(json.revenue[0].total_profit);
        setUsersOrdered(json.usersCountMadeOrders[0].user_count);
        setSalesDaily({
          labels: json.revenueDaily.map((el) => el.order_day.split("-")[2]),
          datasets: {
            label: "Revenue",
            data: json.revenueDaily.map((el) => Number(el.daily_profit)),
          },
        });
        setUsersDaily({
          labels: json.usersDaily.map((el) => el.order_day.split("-")[2]),
          datasets: {
            label: "Users ordered",
            data: json.usersDaily.map((el) => Number(el.user_count)),
          },
        });
      } catch (e) {
        console.log(e);
        setErrorStatus(true);
        setErrorMessage({ error: "Couldn't load data" });
      }
    })();
  }, []);
  return (
    <DashboardLayout>
      <ErrorComponent
        error={errorStatus}
        message={errorMessage}
        setError={setErrorStatus}
      />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Orders last week"
                count={ordersCount}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users ordered"
                count={usersOrdered}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count={revenue}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={"Sales daily for last week"}
                  date="results for 'previous' week"
                  chart={salesDaily}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Users orders"
                  description="Users that made orders last week"
                  date="results for 'previous' week"
                  chart={usersDaily}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
