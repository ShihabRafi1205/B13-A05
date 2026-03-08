let allIssues = [];

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("opened-btn");
const closeBtn = document.getElementById("closed-btn");
const buttons = document.querySelectorAll(".btn1");


const spinnerManage = (status) => {
  if(status==true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("issues-container").classList.add("hidden")
  }else{
    document.getElementById("issues-container").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
  }
}

const loadIssues = () => {
  spinnerManage(true)
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
     allIssues = data.data;
      displayIssues(allIssues)
      spinnerManage(false)
    });
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

const loadModal = (id) => {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) => displayModal(data.data));
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    spinnerManage(true)
    buttons.forEach((btn) => {
      btn.classList.remove("bg-[#4A00FF]", "text-white");
    });
    button.classList.add("bg-[#4A00FF]", "text-white");


    
    if(button.id == "all-btn"){
      displayIssues(allIssues)
    }else if(button.id == "opened-btn"){
      const issuesOpen =allIssues.filter(issue => issue.status=="open");
      displayIssues(issuesOpen)
    }else if(button.id == "closed-btn"){
      const issuesclosed =allIssues.filter(issue => issue.status=="closed");
      displayIssues(issuesclosed)
    }
    spinnerManage(false)
  });
});



const displayModal = (issue) => {
  const getModalContainer = document.getElementById("modalContainer");
  getModalContainer.innerHTML = `<div class="card space-y-4  p-3   h-full">

        <div class="flex justify-between">
        <div><img src="./assets/Open-Status.png" alt="" /></div>
        <p class="text-[#EF4444] p-2 rounded-lg bg-yellow-100">${issue.priority}</p>
      </div>

      <h4 class="font-semibold text-[#1F2937]">${issue.title}</h4>
      <p class="text-[#64748B]">${issue.description}</p>

      <div class="flex gap-6 ">
        <p class="bg-purple-200 rounded-lg p-1">${issue.labels[0]}</p>
        <p class="bg-purple-200 rounded-lg p-1">${issue.labels[1] == undefined ? `It can't be found` : issue.labels[1]}</p>
      </div>

      <hr class="text-gray-300">

      <p class="text-[#64748B]">#1 by john_doe</p>
      <p class="text-[#64748B]">1/15/2024</p>
    </div>`;

  if (issue.status == "open") {
    document
      .querySelector(".modal-box")
      .classList.add("border-t-3", "border-green-500");
  } else {
    document
      .querySelector(".modal-box")
      .classList.add("border-t-3", "border-purple-500");
  }

  document.getElementById("my_modal_5").showModal();
};



const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";

  issues.forEach((issue) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `<div class="card space-y-4 shadow-sm p-3 border-t-3 ${issue.status == "open" ? "border-green-500" : "border-purple-500"} h-full">

        <div class="flex justify-between">
        <div><img src="./assets/Open-Status.png" alt="" /></div>
        <p class="text-[#EF4444] p-2 rounded-lg bg-yellow-100">${issue.priority}</p>
      </div>

      <h4 class="font-semibold text-[#1F2937]">${issue.title}</h4>
      <p class="text-[#64748B]">${issue.description}</p>

      <div class="flex gap-6 ">
        <p class="bg-purple-200 rounded-lg p-1">${issue.labels[0]}</p>
        <p class="bg-purple-200 rounded-lg p-1">${issue.labels[1] == undefined ? `It can't be found` : issue.labels[1]}</p>
      </div>

      <hr class="text-gray-300">

      <p class="text-[#64748B]">#1 by john_doe</p>
      <p class="text-[#64748B]">1/15/2024</p>
    </div>`;

    // Modal
    cardDiv.addEventListener("click", () => {
      loadModal(issue.id);
    });

    issuesContainer.append(cardDiv);
  });
};

loadIssues();


// Search
document.getElementById("btn-search").addEventListener("click", ()=>{
  const searchInput = document.getElementById("input-search");
  const searchValue = searchInput.value.trim().toLowerCase();

      const filteredIssues = allIssues.filter(issue => 
        issue.title.toLowerCase().includes(searchValue)
      );
     displayIssues(filteredIssues)
    })
// })
