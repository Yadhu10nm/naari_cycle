// ==========================
// 📋 SURVEY DATA
// ==========================

const surveyData = {
  age: ["15-18","18-22","22-25","25-30","30-35","35-40","Other"],
  location: ["Metro city","Tier 2 city","Small town","Village"],
  height: ["Below 140 cm","140–150 cm","151–160 cm","161–170 cm","Above 170 cm"],
  weight: ["Below 40 kg","40–50 kg","51–60 kg","61–70 kg","Above 70 kg"],
  weightChange: ["Yes, increased","Yes, decreased","No change"],
  tracks: ["Yes, regularly","No","Sometimes"],
  trackMethod: ["Mobile app","Calendar","Notes","I don't track"],
  yesNo: ["Yes","No"],
  yesNoMaybe: ["Yes","No","Maybe"],
  features: [
    "Period tracking","PCOS education","Irregularity detection",
    "Doctor consultation","Diet plan","Exercise plan","Regional language"
  ],
  problems: [
    "Irregular periods","PCOS/PCOD","Mood swings",
    "Heavy bleeding","Lack of understanding","Other"
  ],
  avoidReasons: [
    "Too expensive","Embarrassing","Fear",
    "Not serious","No doctor nearby","Parents won't allow"
  ],
  price: ["₹29","₹49","₹99","₹199","Other"],
  paymentModel: ["Only ads","Only subscription","Both"],
  understanding: [
    "I understand clearly",
    "I don't know much",
    "I know little",
    "I don't fully understand"
  ],
  language: ["English","Kannada","Hindi","Other"]
};

// ==========================
// 🎨 RENDER FUNCTIONS
// ==========================

function renderRadio(name, id, options) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  options.forEach(opt => {
    el.innerHTML += `
      <label class="radio-item">
        <input type="radio" name="${name}" value="${opt}">
        <span>${opt}</span>
      </label>
    `;
  });
}

function renderCheckbox(id, options) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  options.forEach(opt => {
    el.innerHTML += `
      <label class="check-item">
        <input type="checkbox" value="${opt}">
        <span>${opt}</span>
      </label>
    `;
  });
}

// ==========================
// 🚀 LOAD OPTIONS
// ==========================

function loadSurvey() {
  renderRadio("age","ageOptions",surveyData.age);
  renderRadio("location","locationOptions",surveyData.location);

  renderRadio("height","heightOptions",surveyData.height);
  renderRadio("weight","weightOptions",surveyData.weight);
  renderRadio("weightChange","weightChangeOptions",surveyData.weightChange);

  renderRadio("tracks","tracksOptions",surveyData.tracks);
  renderRadio("trackMethod","trackMethodOptions",surveyData.trackMethod);
  renderRadio("knowsApps","knowsAppsOptions",surveyData.yesNo);

  renderCheckbox("features1Options",surveyData.features);
  renderRadio("prefLang","prefLangOptions",surveyData.language);
  renderRadio("aiApp","aiAppOptions",surveyData.yesNoMaybe);
  renderRadio("price","priceOptions",surveyData.price);

  renderCheckbox("problemsOptions",surveyData.problems);
  renderRadio("avoidedGyn","avoidedGynOptions",surveyData.yesNo);
  renderCheckbox("avoidReasonOptions",surveyData.avoidReasons);
  renderRadio("payDoctor","payDoctorOptions",surveyData.yesNoMaybe);
  renderRadio("paymentModel","paymentModelOptions",surveyData.paymentModel);
  renderRadio("understanding","understandingOptions",surveyData.understanding);
  renderRadio("searchedPcos","searchedPcosOptions",surveyData.yesNo);
}

loadSurvey();

// ==========================
// 🔄 STEP NAVIGATION
// ==========================

let currentStep = 1;
const totalSteps = 5;

// create dots
function initSteps(){
  const container = document.getElementById("progressSteps");
  container.innerHTML = "";

  for(let i=1;i<=totalSteps;i++){
    const dot = document.createElement("div");
    dot.classList.add("step-dot");
    if(i===1) dot.classList.add("active");
    container.appendChild(dot);
  }
}

initSteps();

function showStep(step){
  document.querySelectorAll(".step").forEach(s=>s.style.display="none");
  document.getElementById(`step${step}`).style.display="block";

  document.getElementById("btnBack").style.display =
    step===1?"none":"inline-block";

  document.getElementById("btnNext").innerText =
    step===totalSteps?"Submit":"Next →";

  updateProgress();
}

function updateProgress(){
  const percent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressPercent").innerText = percent + "%";
  document.getElementById("progressSection").innerText =
    `Section ${currentStep} of ${totalSteps}`;

  const dots = document.querySelectorAll(".step-dot");
  dots.forEach((dot,index)=>{
    dot.classList.toggle("active", index < currentStep);
  });
}

// START
document.getElementById("startBtn").onclick = ()=>{
  document.getElementById("heroSection").style.display="none";
  document.getElementById("surveyMain").style.display="block";
  showStep(1);
};

// NEXT
document.getElementById("btnNext").onclick = ()=>{
  if(!validateStep(currentStep)) return;

  if(currentStep < totalSteps){
    currentStep++;
    showStep(currentStep);
  } else {
    submitForm();
  }
};

// BACK
document.getElementById("btnBack").onclick = ()=>{
  currentStep--;
  showStep(currentStep);
};

// ==========================
// 👀 CONDITIONAL LOGIC
// ==========================

document.addEventListener("change",(e)=>{
  const val = e.target.value;

  if(e.target.name==="age"){
    document.getElementById("ageOther").style.display =
      val==="Other"?"block":"none";
  }

  if(e.target.name==="prefLang"){
    document.getElementById("prefLangOther").style.display =
      val==="Other"?"block":"none";
  }

  if(e.target.name==="price"){
    document.getElementById("priceOther").style.display =
      val==="Other"?"block":"none";
  }

  if(e.target.name==="tracks"){
    document.getElementById("trackMethodGroup").style.display =
      (val==="Yes, regularly"||val==="Sometimes")?"block":"none";
  }

  if(e.target.name==="knowsApps"){
    document.getElementById("whyNoAppGroup").style.display =
      val==="No"?"block":"none";

    document.getElementById("currentAppGroup").style.display =
      val==="Yes"?"block":"none";

    document.getElementById("dislikesGroup").style.display =
      val==="Yes"?"block":"none";
  }

  if(e.target.name==="avoidedGyn"){
    document.getElementById("avoidReasonGroup").style.display =
      val==="Yes"?"block":"none";
  }

  const problems = getCheckboxValues("problemsOptions");
  document.getElementById("problemOther").style.display =
    problems.includes("Other")?"block":"none";
});

// ==========================
// 🧠 HELPERS
// ==========================

function getValue(name){
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : "";
}

function getCheckboxValues(id){
  return [...document.querySelectorAll(`#${id} input:checked`)].map(x=>x.value);
}

// ==========================
// 🚨 VALIDATION
// ==========================

function validateStep(step){

  if(step === 1){
    if(!getValue("age")) return alert("Select age"), false;
    if(!getValue("location")) return alert("Select location"), false;
  }

  if(step === 2){
    if(!getValue("height")) return alert("Select height"), false;
    if(!getValue("weight")) return alert("Select weight"), false;
  }

  if(step === 3){
    if(!getValue("tracks")) return alert("Answer tracking"), false;
  }

  if(step === 4){
    if(getCheckboxValues("features1Options").length === 0)
      return alert("Select features"), false;
  }

  if(step === 5){
    if(getCheckboxValues("problemsOptions").length === 0)
      return alert("Select problems"), false;
  }

  return true;
}

// ==========================
// 🚀 SUBMIT
// ==========================

function submitForm(){

  document.getElementById("loadingOverlay").style.display="flex";

  const data = {

    // STEP 1
    age: getValue("age")==="Other"
      ? document.getElementById("ageOther").value
      : getValue("age"),

    location: getValue("location"),

    // STEP 2
    height: getValue("height"),
    weight: getValue("weight"),
    weightChange: getValue("weightChange"),

    // STEP 3
    tracks: getValue("tracks"),
    trackMethod: getValue("trackMethod"),
    knowsApps: getValue("knowsApps"),

    currentApp: document.getElementById("currentApp").value,
    dislikes: document.getElementById("dislikesApp").value,

    // STEP 4
    features1: getCheckboxValues("features1Options"),

    preferredLang: getValue("prefLang")==="Other"
      ? document.getElementById("prefLangOther").value
      : getValue("prefLang"),

    aiApp: getValue("aiApp"),

    price: getValue("price")==="Other"
      ? document.getElementById("priceOther").value
      : getValue("price"),

    // STEP 5
    problems: getCheckboxValues("problemsOptions"),
    problemOther: document.getElementById("problemOther").value,

    avoidedGyn: getValue("avoidedGyn"),
    avoidReasons: getCheckboxValues("avoidReasonOptions"),

    payDoctor: getValue("payDoctor"),
    paymentModel: getValue("paymentModel"),

    understanding: getValue("understanding"),
    searchedPcos: getValue("searchedPcos"),

    additionalChallenges: document.getElementById("additionalChallenges").value
  };

  fetch("https://script.google.com/macros/s/AKfycbywVx5sxNevGcaHvCSqs5wRWSCDWjbpPR8NRm9EIN5mG-V5e5KRhWCpuBDpzm_k-oVRRw/exec",{
    method:"POST",
    body:JSON.stringify(data)
  })
  .then(()=>{
    document.getElementById("loadingOverlay").style.display="none";
    document.getElementById("surveyMain").style.display="none";
    document.getElementById("successScreen").style.display="block";
  })
  .catch(()=>{
    alert("Error submitting");
  });
}
