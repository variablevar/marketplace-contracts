import axios from "axios";
import { IMetadata } from "../../lib/models/metadata";

const key = process.env.PINATA_AUTH_TOKEN;

export const pinJSONToIPFS = async (JSONBody: IMetadata) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, JSONBody, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    })
    .then(function (response: any) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error: any) {
      return {
        success: false,
        pinataUrl: null,

        message: error.message,
      };
    });
};

export const pinFileToIPFS = async (formdata: FormData) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  return axios
    .post(url, formdata, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    })
    .then(function (response: any) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error: any) {
      return {
        success: false,
        pinataUrl: null,
        message: error.message,
      };
    });
};
