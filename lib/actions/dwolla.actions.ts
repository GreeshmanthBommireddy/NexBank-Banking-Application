"use server";

import { Client } from "dwolla-v2";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = (process.env.DWOLLA_ENV as string | undefined)?.toLowerCase();
  if (environment === "production" || environment === "sandbox") return environment;
  // Default to sandbox to avoid build-time failures when env is not configured
  return "sandbox";
};

// Create the Dwolla client lazily to avoid throwing at module import time
let _dwollaClient: ReturnType<typeof Client> | null = null;

const getDwollaClient = () => {
  if (_dwollaClient) return _dwollaClient;

  const key = process.env.DWOLLA_KEY;
  const secret = process.env.DWOLLA_SECRET;

  if (!key || !secret) {
    // Don't throw during import/compile. Throw with a helpful message when the client is actually needed.
    throw new Error(
      'DWOLLA_KEY and DWOLLA_SECRET environment variables are required to use Dwolla APIs. Please set them in your environment.'
    );
  }

  _dwollaClient = new Client({
    environment: getEnvironment(),
    key,
    secret,
  });

  return _dwollaClient;
};

// Create a Dwolla Funding Source using a Plaid Processor Token
export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    return await getDwollaClient()
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Funding Source Failed: ", err);
  }
};

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await getDwollaClient().post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (err) {
    console.error("Creating an On Demand Authorization Failed: ", err);
  }
};

export const createDwollaCustomer = async (
    newCustomer: NewDwollaCustomerParams
  ) => {

    const validStateAbbreviations = new Set([
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
        "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV",
        "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
        "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
      ]);
    
      if (!validStateAbbreviations.has(newCustomer.state)) {
        throw new Error(`Invalid state abbreviation: ${newCustomer.state}`);
      }

      const zipCodePattern = /^\d{5}(-\d{4})?$/;
  if (!zipCodePattern.test(newCustomer.postalCode)) {
    throw new Error(`Invalid postal code format: ${newCustomer.postalCode}`);
  }

    try {
  const response = await getDwollaClient().post("customers", newCustomer);
      return response.headers.get("location");
    } catch (err) {
      console.error("Creating a Dwolla Customer Failed: ", err);
      throw new Error("Failed to create Dwolla customer");
    }
  };
  

export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };
    return await getDwollaClient()
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};

export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    // create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    return await createFundingSource(fundingSourceOptions);
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};