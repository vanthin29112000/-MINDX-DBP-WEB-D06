import React from "react";
import { Button, Form, Input } from "antd";
import { formatCountdown } from "antd/lib/statistic/utils";
const { Search } = Input;

export const AddInput = ({ onAddUser }) => {
   const [form] = Form.useForm();
   const onFinish = (values) => {
      const { userName } = values;
      console.log("values", values);
      onAddUser(userName);
      form.resetFields();
   };

   return (
      <>
         <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ display: "flex", justifyContent: "center" }}
         >
            <Form.Item
               name="userName"
               style={{ width: "calc(100% - 200px)" }}
               shouldUpdate={true}
            >
               <Input />
            </Form.Item>

            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Add User
               </Button>
            </Form.Item>
         </Form>
      </>
   );
};
