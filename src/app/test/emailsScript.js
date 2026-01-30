import axios from "axios";


let data =
''

// send-bulk-emails.js

const CHUNK_SIZE = 20;      // emails per batch
const DELAY_MS = 8000;     // 8 seconds between batches

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ✅ Clean email array
const emails = data
  .split(",")
  .map(e => e.trim())
  .filter(Boolean);

// ✅ Chunk helper
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const run = async () => {
  console.log(`Total emails: ${emails.length}`);

  const chunks = chunkArray(emails, CHUNK_SIZE);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    console.log(`\n🚀 Sending batch ${i + 1}/${chunks.length}`);

    for (const to of chunk) {
      try {
        const res = await axios.post("http://localhost:3000/api/companymail", {to});
        console.log(res.data.message)
        if (res) {
          console.log(`✅ Sent: ${res.data.message}`);
        } else {
          console.log(`⚠️ Skipped/Failed: ${to} -> ${res?.data?.message || res.error}`);
        }

      } catch (err) {
        console.error(`❌ Error for ${to}:`, err.message);
      }
    }

    // ⏳ Delay between batches
    if (i < chunks.length - 1) {
      console.log(`⏳ Waiting ${DELAY_MS / 1000}s before next batch...`);
      await sleep(DELAY_MS);
    }
  }

  console.log("\n🎉 All emails processed!");
};

run();
