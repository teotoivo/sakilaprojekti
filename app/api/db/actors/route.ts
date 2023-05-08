import mysql from "mysql";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sakila",
  });

  connection.connect();

  const pageSize = 20;

  const queryPromise = new Promise((resolve, reject) => {
    const page = searchParams.get("page") || "0";

    const offset = Number(page) * pageSize;

    // Check if page is a number
    if (isNaN(Number(page))) {
      reject("page must be a number");
    }

    //
    const query = `
    SELECT first_name, last_name, actor_id FROM actor ORDER BY first_name
    `;

    try {
      connection.query(query, function (error, results, fields) {
        if (error) {
          console.log("error: ", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    } catch (error: any) {
      reject(error);
    }
  });

  try {
    const results = await queryPromise;
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
