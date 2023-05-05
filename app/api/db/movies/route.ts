import mysql from "mysql";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sakila",
  });

  connection.connect();

  const pageSize = 20;

  const queryPromise = new Promise((resolve, reject) => {
    if (searchParams.get("page") === null) {
      searchParams.set("page", "0");
    }
    connection.query(
      `SELECT film_id, title, description, release_year, length, rating, special_features FROM film LIMIT ${pageSize} OFFSET ${
        Number(searchParams.get("page")) * pageSize
      }`,
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

  console.log("test");

  try {
    const results = await queryPromise;
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.error();
  }
}
