document.getElementById("analyzeBtn").addEventListener("click", function () {
  const imageUrl = document.getElementById("imageUrl").value;
  if (imageUrl) {
    fetch("/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: imageUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("ocrOutput").innerText = JSON.stringify(
          data,
          null,
          2
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById(
          "ocrOutput"
        ).innerText = `Error: ${error.message}`;
      });
  } else {
    alert("Please enter an image URL.");
  }
});
