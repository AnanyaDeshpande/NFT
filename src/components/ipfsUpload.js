import { create } from 'ipfs-http-client';

// Initialize IPFS client with Pinata Cloud endpoint and authorization headers
const ipfs = create({
  url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  headers: {
    authorization: '66b8105276b7b1701d56', // Replace with your Pinata API key
  },
});

// Function to upload metadata to IPFS
const uploadMetadataToIPFS = async (metadata) => {
  try {
    const result = await ipfs.add(JSON.stringify(metadata));
    // Return the CID of the uploaded metadata
    return result.cid.toString();
  } catch (error) {
    console.error("Error uploading metadata to IPFS:", error.message);
    throw error; // Propagate the error back to the caller
  }
};

export { uploadMetadataToIPFS };
