import { connection } from "../config/database.js";
import { TransactionTypes } from "./cardRepository.js";

export interface Business {
  businessId: number;
  name: string;
  type: TransactionTypes;
}

export async function findById(businessId: number) {
  const result = await connection.query<Business, [number]>(
    "SELECT * FROM businesses WHERE id=$1",
    [businessId]
  );

  return result.rows[0];
}
