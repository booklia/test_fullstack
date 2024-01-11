import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import MDInput from "../../../components/MDInput";
import { useState } from "react";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";

function OperationsComponent({
  setOrders,
  orders,
  errorStatus,
  setErrorStatus,
  errorMessage,
  setErrorMessage,
}) {
  const [currentAction, setCurrentAction] = useState("");
  const queries = {
    ADD: async (query) => {
      try {
        const res = await fetch("http://localhost:3001/orders", {
          method: "POST",
          body: JSON.stringify(query),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res;
      } catch (e) {
        console.log(e);
      }
    },
    UPDATE: async (query) => {
      try {
        const res = await fetch(`http://localhost:3001/orders/${query.id}`, {
          method: "PUT",
          body: JSON.stringify(query),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res;
      } catch (e) {
        console.log(e);
      }
    },
    DELETE: async (query) => {
      try {
        const res = await fetch(`http://localhost:3001/orders/${query.id}`, {
          method: "DELETE",
        });
        return res;
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <>
      <ErrorComponent
        setError={setErrorStatus}
        error={errorStatus}
        message={errorMessage}
      />
      <MDBox
        display="flex"
        gap="20px"
        alignItems="center"
        pt={2}
        px={2}
        marginBottom="10px"
      >
        <MDButton
          size="small"
          variant="outlined"
          color="warning"
          onClick={() => setCurrentAction(currentAction !== "ADD" ? "ADD" : "")}
        >
          Add Order
        </MDButton>
        <MDButton
          size="small"
          variant="outlined"
          color="success"
          onClick={() =>
            setCurrentAction(currentAction !== "UPDATE" ? "UPDATE" : "")
          }
        >
          Update Order
        </MDButton>
        <MDButton
          size="small"
          variant="outlined"
          color="primary"
          onClick={() =>
            setCurrentAction(currentAction !== "DELETE" ? "DELETE" : "")
          }
        >
          Delete Order
        </MDButton>
      </MDBox>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const query = {};
          Array.from(formData).forEach(([k, v]) => {
            if (v) {
              query[k] = v;
            }
          });
          const res = await queries[currentAction](query);
          if (res.status === 200) {
            const json = await res.json();
            if (currentAction === "ADD") {
              json.order_date = json.order_date
                ? json.order_date.split("T")[0]
                : json.order_date;
              json.user_id = Number(json.user_id);
              setOrders([...orders, json]);
            } else if (currentAction === "UPDATE") {
              json.order_date = json.order_date
                ? json.order_date.split("T")[0]
                : json.order_date;
              json.user_id = Number(json.user_id);
              setOrders(
                orders.map((el) => (el.id === Number(query.id) ? json : el))
              );
            } else if (currentAction === "DELETE") {
              setOrders(orders.filter((el) => el.id !== Number(query.id)));
            }
          } else {
            setErrorStatus(true);
            setErrorMessage(await res.json());
          }
        }}
      >
        <MDBox
          display="flex"
          gap="20px"
          alignItems="center"
          px={2}
          marginBottom="10px"
          height="50px"
        >
          {(currentAction === "UPDATE" || currentAction === "DELETE") && (
            <MDInput name="id" label="ID" required />
          )}
          {(currentAction === "UPDATE" || currentAction === "ADD") && (
            <MDInput name="order_amount" label="ORDER AMOUNT" />
          )}
          {(currentAction === "UPDATE" || currentAction === "ADD") && (
            <MDInput name="order_comment" label="ORDER COMMENT" />
          )}
          {(currentAction === "UPDATE" || currentAction === "ADD") && (
            <MDInput name="order_date" label="ORDER DATE" />
          )}
          {(currentAction === "UPDATE" || currentAction === "ADD") && (
            <MDInput name="user_id" label="USER ID" required />
          )}
          {currentAction !== "" && (
            <MDButton size="medium" color="info" type="submit">
              {currentAction}
            </MDButton>
          )}
        </MDBox>
      </form>
    </>
  );
}

export default OperationsComponent;
