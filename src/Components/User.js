import React, { Component } from "react";
import { connect } from "react-redux";
import fetchUsers from "../Actions/fecthUsers.js";
import { List, Avatar, Space, Button } from "antd";
import {
   MessageOutlined,
   LikeOutlined,
   StarOutlined,
   PoweroffOutlined,
} from "@ant-design/icons";
class User extends Component {
   render() {
      const { users } = this.props;
      console.log(users);

      const IconText = ({ icon, text }) => (
         <Space>
            {React.createElement(icon)}
            {text}
         </Space>
      );
      return (
         <>
            <h2
               style={{ width: "50vw", margin: "0 auto", textAlign: "center" }}
            >
               Danh sách các user fetch data :{" "}
            </h2>
            <div
               style={{
                  width: "50vw",
                  margin: "0 auto",
                  marginTop: "32px",
               }}
            >
               {users.length > 0 ? (
                  <List
                     itemLayout="vertical"
                     size="small"
                     pagination={{
                        pageSize: 3,
                     }}
                     dataSource={users}
                     renderItem={(item) => (
                        <List.Item key={item.title}>
                           <List.Item.Meta
                              avatar={
                                 <Avatar src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAewMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIDBQYHBP/EADIQAAICAgAEAwUIAgMAAAAAAAABAgMEEQUSIVEGMUETYZGxwSIjMlJxgaHhFGI0Y3L/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APcQAAAAApZZCuPNZJRj3k9I+TifEKsSvlcn7WS6Rjrf9HK5F88ixztlKT9OZ70B1M+M4MHp3b98YtowZHHsavXsoyt36rp8zl2yGwOhXiSHOt40+X1akmzb4mXTl1+0x5qS9e6/VHDNmbCy7MLIjdU/L8UfzLsB3QNLDxJiOepV3Rj+bSZtqLq76o20yUoSW016gZAAAAAAAADDmX/4+NZdrfJHeu5mPh409cMyH7l80Byl1s7rJWWy5pye2zG2GyoAhsNlWwDZDZDZVsA2dV4UslLDsrk04xntdeq36P5/ucobnwpJriU4p9HU9r90B1wAAAAAAAB8PGlvheQv9d/Bo+4+XibgsC9TlGKlW0uZ666A4ohsFWAZVsMq2AbIBDKDZuvCS3xGx9qn80aNm+8ISrjlX804xm4JRTfV9euiDrAAAAAAAADmfFU28umvf2Y18yXvb/o6Y5zxXRLnpyEm465JPt6r6gaBsqw2VbANkAhsAyrDZVsoMhTlBqcHqUXtPsyGy+NRPKyK8ev8VklFe73gek1y564y/MkyxEUoxUV5JaRJAAAAAADHfTXkVSquipQktNMyADkuO8Jq4fVXbRKyUZSalzNPXb6mlO+4jirNw7KJdOZfZfZ+jOCthKqyVdi5Zxemn6MCrZVsNlWyg2VbDZVsDPhUPKzKaFv7yaT129f4O44ZwbE4dKU6VOdj6c9jTaXZaNN4QwG5TzrI9EuSrff1f0+J1RAAAAAAAAAAAA5bxfRXCyi6MdTs3GT761o6HIzsXF3/AJGRVW16OS38Dl/EvE8bP9jHGlKXs3LbcdLroDR7KthsqUGZMauNuVRVPfLOyMXrs3oxMvjWKnKotknywsjJ689J7CPS6a4U1xrriowitRivRFzWY3HuGZHSOVCD7W/Y+ZsoyU4qUWmn5NPzIqQAAAAA1OZx/Cx5OEXO6S8/Zrov3K+J8uWPgKuDaldLl2u3r9F+5x3QDf5HijIltY9EK13k+Z/Q1WTxTOyNq3Ks12i+VfwfIyrZQZVsNlQBDBDYQbKthsq2AbL0ZV+NLmx7rK3/AKSaMTZAG7xfFPEqNKyVd8f+yOn8UbbF8ZY0tLKxba33g1JfQ41lWFeqYWbjZ1KtxLY2Q8unp+q9D6DzfwxnTwuMUpS+7ukq5rvvy/k9HIOY8YS+9xY9oyfyOdZ0HjD/AJON/wCH8znmBDZVsllWUQQSQwiGyrZLKsCGyrZLKsAQCGBDZVsllWBambhfXJPrGaa+J655nkMPxx/VHry8kRX/2Q==" />
                              }
                              title={<a href={item.website}>{item.name}</a>}
                              description={
                                 <>
                                    <b>Email: </b>
                                    {item.email}
                                    <br />
                                    <b>Address :</b>

                                    {`${item.address.street},
                                        ${item.address.suite},
                                        ${item.address.city}`}
                                    <br />
                                    <b>Phone number: </b>
                                    {item.phone}
                                    <br />
                                    <b>Company: </b>
                                    {item.company.name}
                                 </>
                              }
                           />
                        </List.Item>
                     )}
                  />
               ) : (
                  <div style={{ width: "100%", textAlign: "center" }}>
                     <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        onClick={() => {
                           this.props.fetchUsers();
                        }}
                     >
                        Click me!
                     </Button>
                  </div>
               )}
            </div>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      users: state.users,
   };
};

export default connect(mapStateToProps, { fetchUsers })(User);
