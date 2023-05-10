import mysql from "mysql";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sakila",
  });

  connection.connect();

  const queryPromise = new Promise((resolve, reject) => {
    connection.query(
      `SELECT s.store_id, a.address, c.city
			FROM store s 
			JOIN address a ON s.address_id = a.address_id
			JOIN city c ON a.city_id = c.city_id;
			`,
      function (error, results, fields) {
        if (error) {
          console.log("error: ", error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });

  try {
    const results = await queryPromise;
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.error();
  }
}
