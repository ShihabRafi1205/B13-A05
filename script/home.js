const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
};

// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// }

const displayIssues = (issues) => {
  issuesContainer = document.getElementById("issues-container");
  // issuesContainer.innerHTML = "";

  issues.forEach((issue) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `<div class="card space-y-4 shadow-sm p-3 border-t-3 ${issue.status=="open"? 'border-green-500' : 'border-purple-500'} h-full">

        <div class="flex justify-between">
        <div><img src="./assets/Open-Status.png" alt="" /></div>
        <p class="text-[#EF4444] p-2 rounded-lg bg-yellow-100">${issue.priority}</p>
      </div>

      <h4 class="font-semibold text-[#1F2937]">${issue.title}</h4>
      <p class="text-[#64748B]">${issue.description}}</p>

      <div class="flex gap-6 ">
        <p class="bg-purple-200 rounded-lg p-1">${issue.labels[0]}</p>
        <p class="bg-purple-200 rounded-lg p-1">${issue.labels[1] == undefined ? `It can't be found` : issue.labels[1]}</p>
      </div>

      <hr class="text-gray-300">

      <p class="text-[#64748B]">#1 by john_doe</p>
      <p class="text-[#64748B]">1/15/2024</p>
    </div>`;

    issuesContainer.append(cardDiv);
  });
};

loadIssues();
