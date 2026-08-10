/**
 * KYAU PDF Cover Page Builder - Official Application Logic
 * Khwaja Yunus Ali University (Department of Computer Science & Engineering)
 */

// ==========================================================================
// 1. DATA PRESETS
// ==========================================================================

const CSE_18TH_BATCH_STUDENTS = [
    { studentId: '6224205101001', name: 'Md. Rakibul Islam' },
    { studentId: '6224205101002', name: 'Siam Hossain' },
    { studentId: '6224205101003', name: 'Md. Radoun Hossin Mukta' },
    { studentId: '6224205101004', name: 'Md. Shahariar Ahmed Kanon' },
    { studentId: '6224205101005', name: 'Mst. Anamika Jahan' },
    { studentId: '6224205101006', name: 'Md. Sojib Ahmed' },
    { studentId: '6224205101007', name: 'Mst. Ananna Khandaker' },
    { studentId: '6224205101008', name: 'Md. Rakib Hasan Riyad' },
    { studentId: '6224205101010', name: 'Most. Khadija Khatun' },
    { studentId: '6224205101011', name: 'Md. Rezwan Ahmed Ratul' },
    { studentId: '6224205101012', name: 'Maruf Ibna Abdullah Rifat' },
    { studentId: '6224205101013', name: 'Md. Rabbi' },
    { studentId: '6224205101014', name: 'Mst. Mushkat Jahan Shila' },
    { studentId: '6224205101016', name: 'Ijaj Ahmed Rafi' },
    { studentId: '6224205101017', name: 'Md. Sabbir Hossain Rahat' },
    { studentId: '6224205101018', name: 'Abid Hasan Hujaifa' },
    { studentId: '6224205101019', name: 'Sabiha Rumman Medha' },
    { studentId: '6224205101020', name: 'Md. Intaj Hassan Nibir' },
    { studentId: '6224205101021', name: 'Md. Asif Foysal' },
    { studentId: '6224205101023', name: 'Fardin Khan Sadi' },
    { studentId: '6224205101024', name: 'Abir Deb' },
    { studentId: '6224205101025', name: 'Bashudeb Kumer Paul' },
    { studentId: '6224205101026', name: 'Md. Abdur Rahim Ratul' },
    { studentId: '6224205101027', name: 'Tahsin Tasnim Tandra' },
    { studentId: '6224205101028', name: 'Maream' },
    { studentId: '6224205101029', name: 'Md. Imran Hassain' },
    { studentId: '6224205101030', name: 'Abu Sowad Mohammad Ali Siam' },
    { studentId: '6224205101031', name: 'Fatima Rahman Shoshi' },
    { studentId: '6224205101032', name: 'Rukaiya Rafiq Ulfa' },
    { studentId: '6224205101033', name: 'S. M. Salman Farshi' },
    { studentId: '6224205101034', name: 'Tawhidur Rahman Shishir' },
    { studentId: '6224205101035', name: 'Md. Samiul Islam Shihab' },
    { studentId: '6224205101036', name: 'Md. Abu Raihan' },
    { studentId: '6224205101037', name: 'Md. Shimul Sarkar' },
    { studentId: '6224205101038', name: 'Khairun Nahar Sara' },
    { studentId: '6224205101039', name: 'Md. Montasir Monir Alif' }
];

const KYAU_COURSES_LIST = [
    { code: 'CSE 0613-3101', title: 'Database Management System', teacher: 'Md. Abdur Razzak', designation: 'Lecturer', mobile: '01738759934', email: 'razzak.cse@kyau.edu.bd' },
    { code: 'CSE 0613-3102', title: 'Database Management System Lab', teacher: 'Md. Abdur Razzak', designation: 'Lecturer', mobile: '01738759934', email: 'razzak.cse@kyau.edu.bd' },
    { code: 'CSE 0613-3103', title: 'Operating System', teacher: 'Md. Iftekhar Hossain Tushar', designation: 'Lecturer on Probation', mobile: '01738207727', email: 'mdihtushar.cse@kyau.edu.bd' },
    { code: 'CSE 0613-3104', title: 'Operating System Lab', teacher: 'Md. Iftekhar Hossain Tushar', designation: 'Lecturer on Probation', mobile: '01738207727', email: 'mdihtushar.cse@kyau.edu.bd' },
    { code: 'CSE 0613-3105', title: 'Theory of Computation', teacher: 'Mst. Anika Amzad', designation: 'Lecturer', mobile: '+8801744832245', email: 'anika.cse@kyau.edu.bd' },
    { code: 'CSE 0613-3107', title: 'Microprocessor, Microcontroller and Embedded Systems', teacher: 'Md. Rahat Khan', designation: 'Lecturer', mobile: '01521303383', email: 'rahat.cse@kyau.edu.bd' },
    { code: 'CSE 0613-3108', title: 'Microprocessor, Microcontroller and Embedded Systems Lab', teacher: 'Md. Rahat Khan', designation: 'Lecturer', mobile: '01521303383', email: 'rahat.cse@kyau.edu.bd' },
    { code: 'CSE 0613-3109', title: 'System Analysis and Design', teacher: 'Mst. Anika Amzad', designation: 'Lecturer', mobile: '+8801744832245', email: 'anika.cse@kyau.edu.bd' },
    { code: 'CSE 0613-3111', title: 'Data Communication', teacher: 'Ishrat Zahan Raka', designation: 'Lecturer', mobile: '01752473694', email: 'ishrat.cse@kyau.edu.bd' }
];

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================

let currentMode = 'SINGLE'; // 'SINGLE' | 'BULK'
let selectedBatch = '18th';
let lastBatch = '18th'; // track batch changes to clear form on switch
let selectedStudentIds = new Set(); // Empty by default
let zoomScale = 0.85;
let isGenerating = false;

// ==========================================================================
// 3. DOM ELEMENTS
// ==========================================================================

const inputs = {
    type: document.getElementById('inType'),
    no: document.getElementById('inNo'),
    ccode: document.getElementById('inCCode'),
    ctitle: document.getElementById('inCTitle'),
    topic: document.getElementById('inTopic'),
    season: document.getElementById('inSemSeason'),
    year: document.getElementById('inSemYear'),
    sname: document.getElementById('inSName'),
    sid: document.getElementById('inSID'),
    sbatch: document.getElementById('selectGlobalBatch'),
    ssem: document.getElementById('inSSem'),
    tname: document.getElementById('inTName'),
    tdesig: document.getElementById('inTDesig'),
    tdept: document.getElementById('inTDept')
};

const outputs = {
    type: document.getElementById('outType'),
    typeLabel: document.getElementById('outTypeLabel'),
    no: document.getElementById('outNo'),
    no2: document.getElementById('outNo2'),
    ccode: document.getElementById('outCCode'),
    ctitle: document.getElementById('outCTitle'),
    topic: document.getElementById('outTopic'),
    sem: document.getElementById('outSem'),
    sname: document.getElementById('outSName'),
    sid: document.getElementById('outSID'),
    sbatch: document.getElementById('outSBatch'),
    ssem: document.getElementById('outSSem'),
    tname: document.getElementById('outTName'),
    tdesig: document.getElementById('outTDesig'),
    tdept: document.getElementById('outTDept')
};

// ==========================================================================
// 4. INITIALIZATION
// ==========================================================================

function getResponsiveZoom() {
    if (window.innerWidth <= 480) return 0.52;
    if (window.innerWidth <= 700) return 0.62;
    if (window.innerWidth <= 900) return 0.72;
    return 0.85;
}

document.addEventListener('DOMContentLoaded', () => {
    zoomScale = getResponsiveZoom();
    populateStudentDropdowns();
    populateCoursePresets();
    const designSelect = document.getElementById('pageDesignSelect');
    const coverPage = document.getElementById('cover-page');

    if (designSelect && coverPage) {
        designSelect.addEventListener('change', (e) => {
            const design = e.target.value || 'classic';
            coverPage.classList.remove('page-classic', 'page-elegant', 'page-minimal', 'page-vintage', 'page-ornamental', 'page-plain');
            coverPage.classList.add(`page-${design}`);
        });
        coverPage.classList.add('page-classic');
    }

    setupEventListeners();
    updateBatchVisibility();
    updatePreview();
    updateZoom();
});

// Populate Single Dropdown & Bulk Checkbox List
function populateStudentDropdowns() {
    const optgroup = document.getElementById('optgroupStudents');
    const checkboxList = document.getElementById('studentCheckboxList');
    
    optgroup.innerHTML = '';
    checkboxList.innerHTML = '';

    CSE_18TH_BATCH_STUDENTS.forEach(student => {
        // Single mode option
        const option = document.createElement('option');
        option.value = student.studentId;
        option.textContent = `${student.name} (${student.studentId})`;
        optgroup.appendChild(option);

        // Bulk mode checkbox item
        const item = document.createElement('label');
        item.className = `student-checkbox-item ${selectedStudentIds.has(student.studentId) ? 'checked' : ''}`;
        item.dataset.id = student.studentId;

        const isChecked = selectedStudentIds.has(student.studentId);
        item.innerHTML = `
            <span>${student.name} <small style="color:var(--text-sub)">(${student.studentId})</small></span>
            <input type="checkbox" value="${student.studentId}" ${isChecked ? 'checked' : ''}>
        `;

        item.querySelector('input').addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedStudentIds.add(student.studentId);
                item.classList.add('checked');
            } else {
                selectedStudentIds.delete(student.studentId);
                item.classList.remove('checked');
            }
            updateBulkCounts();
        });

        checkboxList.appendChild(item);
    });

    document.getElementById('totalStudentsText').textContent = CSE_18TH_BATCH_STUDENTS.length;
    updateBulkCounts();
}

// Populate Course Preset Options
function populateCoursePresets() {
    const select = document.getElementById('selectCoursePreset');
    select.innerHTML = '<option value="">-- Choose Preset CSE Course --</option>';
    
    KYAU_COURSES_LIST.forEach(course => {
        const opt = document.createElement('option');
        opt.value = course.code;
        opt.textContent = `${course.code} — ${course.title} (${course.teacher})`;
        select.appendChild(opt);
    });

    select.addEventListener('change', (e) => {
        const found = KYAU_COURSES_LIST.find(c => c.code === e.target.value);
        if (found) {
            inputs.ccode.value = found.code;
            inputs.ctitle.value = found.title;
            inputs.tname.value = found.teacher;
            inputs.tdesig.value = found.designation;
            
            // Auto detect lab report vs assignment
            if (found.title.toLowerCase().includes('lab')) {
                inputs.type.value = 'Lab Report';
            } else {
                inputs.type.value = 'Assignment';
            }
            updatePreview();
            showToast(`Loaded course: ${found.code}`, 'info');
        }
    });
}

// Populate Batch Numbers (10th to 25th)
function populateBatchOptions() {
    const select = inputs.sbatch;
    select.innerHTML = '';
    for (let i = 10; i <= 25; i++) {
        const opt = document.createElement('option');
        opt.value = `${i}th`;
        opt.textContent = `${i}th Batch`;
        if (i === 18) opt.selected = true;
        select.appendChild(opt);
    }
}

// Update Counts & Badges
function updateBulkCounts() {
    const count = selectedStudentIds.size;
    document.getElementById('selectedCountText').textContent = count;
    document.getElementById('badgeBulkCount').textContent = count;
    document.getElementById('btnBulkCountText').textContent = count;
}

// ==========================================================================
// 5. LIVE PREVIEW UPDATE LOGIC
// ==========================================================================

function updatePreview() {
    const typeVal = inputs.type.value || 'Assignment';
    const noVal = inputs.no.value.trim();

    outputs.type.textContent = typeVal;
    outputs.typeLabel.textContent = typeVal;
    outputs.no.textContent = noVal ? `- ${noVal}` : '';
    outputs.no2.textContent = noVal;

    outputs.ccode.textContent = inputs.ccode.value;
    outputs.ctitle.textContent = inputs.ctitle.value;
    outputs.topic.textContent = inputs.topic.value;

    const seasonVal = inputs.season.value;
    const yearVal = inputs.year.value.trim();
    outputs.sem.textContent = (seasonVal || yearVal) ? `${seasonVal} ${yearVal}`.trim() : '';

    outputs.sname.textContent = inputs.sname.value;
    outputs.sid.textContent = inputs.sid.value;
    outputs.sbatch.textContent = selectedBatch;
    outputs.ssem.textContent = inputs.ssem.value;

    outputs.tname.textContent = inputs.tname.value;
    outputs.tdesig.textContent = inputs.tdesig.value;
    
    // Clean up "Department of Department of CSE" duplicate text
    let deptVal = inputs.tdept.value.trim();
    deptVal = deptVal.replace(/^Department of\s+/i, '');
    outputs.tdept.textContent = deptVal;

    // Update Filename preview string
    const filename = getPdfFilename(inputs.sname.value, inputs.ccode.value);
    document.getElementById('filenamePreviewText').textContent = filename;
}

// Generate Clean PDF Filename
function getPdfFilename(name, courseCode) {
    const cleanName = (name || 'CoverPage').replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
    const cleanCourse = (courseCode || 'KYAU').replace(/[^a-zA-Z0-9]/g, '_');
    return `${cleanName}_${cleanCourse}_CoverPage.pdf`;
}

// ==========================================================================
// 6. EVENT LISTENERS
// ==========================================================================

function setupEventListeners() {
    // Input update events
    Object.values(inputs).forEach(input => {
        if (input) {
            input.addEventListener('input', updatePreview);
            input.addEventListener('change', updatePreview);
        }
    });

    // Manual fields toggle (for 18th batch)
    document.getElementById('btnToggleManual').addEventListener('click', toggleManualFields);

    // Global batch selector event
    document.getElementById('selectGlobalBatch').addEventListener('change', (e) => {
        selectedBatch = e.target.value;
        updateBatchVisibility();
        showToast(`Switched batch to ${selectedBatch} Batch`, 'info');
    });

    // Single student dropdown event
    document.getElementById('selectStudent').addEventListener('change', (e) => {
        const studentId = e.target.value;
        if (!studentId) {
            inputs.sname.value = '';
            inputs.sid.value = '';
            updatePreview();
            return;
        }
        const student = CSE_18TH_BATCH_STUDENTS.find(s => s.studentId === studentId);
        if (student) {
            inputs.sname.value = student.name;
            inputs.sid.value = student.studentId;
            updatePreview();
            showToast(`Selected student: ${student.name}`, 'info');
        }
    });

    // Mode switching tabs
    document.getElementById('tabSingleMode').addEventListener('click', () => switchMode('SINGLE'));
    document.getElementById('tabBulkMode').addEventListener('click', () => switchMode('BULK'));

    // Bulk select all / clear
    document.getElementById('btnSelectAll').addEventListener('click', () => {
        CSE_18TH_BATCH_STUDENTS.forEach(s => selectedStudentIds.add(s.studentId));
        populateStudentDropdowns();
        showToast('Selected all batchmates', 'info');
    });

    document.getElementById('btnClearAll').addEventListener('click', () => {
        selectedStudentIds.clear();
        populateStudentDropdowns();
        showToast('Cleared student selection', 'info');
    });

    // Student search filter
    document.getElementById('searchStudent').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.student-checkbox-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });

    // Form Reset button
    document.getElementById('btnResetForm').addEventListener('click', () => {
        inputs.type.value = 'Assignment';
        inputs.no.value = '';
        inputs.ccode.value = '';
        inputs.ctitle.value = '';
        inputs.topic.value = '';
        inputs.season.value = 'Summer';
        inputs.year.value = '2026';
        inputs.sname.value = '';
        inputs.sid.value = '';
        inputs.ssem.value = '3rd Year 1st Semester';
        inputs.tname.value = '';
        inputs.tdesig.value = 'Lecturer';
        inputs.tdept.value = 'Computer Science and Engineering';
        selectedBatch = '18th';
        manualFieldsVisible = false;
        document.getElementById('selectStudent').value = '';
        document.getElementById('selectGlobalBatch').value = '18th';
        updateBatchVisibility();
        updatePreview();
        showToast('Form reset to default values', 'info');
    });

    // Action button triggers
    document.getElementById('btnDownloadSingle').addEventListener('click', downloadSinglePdf);
    document.getElementById('btnDownloadBulk').addEventListener('click', downloadBulkPdfs);
    const shareBtn = document.getElementById('btnShareWhatsApp');
    const shareToolbarBtn = document.getElementById('btnShareWhatsAppToolbar');
    const printBtn = document.getElementById('btnPrintPage');
    const printToolbarBtn = document.getElementById('btnPrintPageToolbar');
    if (shareBtn) shareBtn.addEventListener('click', shareWhatsApp);
    if (shareToolbarBtn) shareToolbarBtn.addEventListener('click', shareWhatsApp);
    if (printBtn) printBtn.addEventListener('click', () => window.print());
    if (printToolbarBtn) printToolbarBtn.addEventListener('click', () => window.print());

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 900) {
            zoomScale = getResponsiveZoom();
            updateZoom();
        }
    });

    // Zoom Controls
    document.getElementById('btnZoomIn').addEventListener('click', () => {
        if (zoomScale < 1.3) {
            zoomScale += 0.08;
            updateZoom();
        }
    });

    document.getElementById('btnZoomOut').addEventListener('click', () => {
        if (zoomScale > 0.4) {
            zoomScale -= 0.08;
            updateZoom();
        }
    });

    document.getElementById('btnZoomReset').addEventListener('click', () => {
        zoomScale = 0.85;
        updateZoom();
    });
}

// Control visibility based on selectedBatch and currentMode
let manualFieldsVisible = false; // Track manual fields state for 18th batch

function clearFormForOtherBatch() {
    // Clear all manual inputs so user starts fresh
    inputs.type.value = 'Assignment';
    inputs.no.value = '';
    inputs.ccode.value = '';
    inputs.ctitle.value = '';
    inputs.topic.value = '';
    inputs.season.value = 'Summer';
    inputs.year.value = '2026';
    inputs.sname.value = '';
    inputs.sid.value = '';
    inputs.ssem.value = '3rd Year 1st Semester';
    inputs.tname.value = '';
    inputs.tdesig.value = 'Lecturer';
    inputs.tdept.value = 'Computer Science and Engineering';
    updatePreview();
}

function updateBatchVisibility() {
    const coursePresetWrapper = document.getElementById('coursePresetWrapper');
    const coursePresetNotice = document.getElementById('coursePresetNotice');
    const singleStudentSec = document.getElementById('singleStudentSection');
    const bulkStudentSec = document.getElementById('bulkStudentSection');
    const customBulkSec = document.getElementById('customBulkSection');
    const manualWrapper = document.getElementById('manualFieldsWrapper');
    const manualToggleRow = document.getElementById('manualToggleRow');
    const modeTabs = document.getElementById('modeTabs');
    const toggleLabel = document.getElementById('toggleManualLabel');
    const toggleButton = document.getElementById('btnToggleManual');
    const toggleIcon = toggleButton ? toggleButton.querySelector('i') : null;

    // Sync form batch select & preview
    if (inputs.sbatch) {
        inputs.sbatch.value = selectedBatch;
    }

    // Clear form when SWITCHING AWAY from 18th to another batch
    if (lastBatch === '18th' && selectedBatch !== '18th') {
        clearFormForOtherBatch();
    }
    lastBatch = selectedBatch;

    if (selectedBatch === '18th') {
        // Show mode tabs
        if (modeTabs) modeTabs.classList.remove('hidden');

        // Show course preset, hide notice if present
        if (coursePresetWrapper) coursePresetWrapper.classList.remove('hidden');
        if (coursePresetNotice) coursePresetNotice.classList.add('hidden');
        if (customBulkSec) customBulkSec.classList.add('hidden');

        // Show toggle button, hide/show manual fields
        if (manualToggleRow) manualToggleRow.classList.remove('hidden');
        if (manualWrapper && toggleLabel && toggleIcon) {
            if (manualFieldsVisible) {
                manualWrapper.classList.remove('hidden');
                toggleLabel.textContent = 'Hide Manual Fields';
                toggleIcon.className = 'fa-solid fa-eye-slash';
            } else {
                manualWrapper.classList.add('hidden');
                toggleLabel.textContent = 'Edit Details Manually';
                toggleIcon.className = 'fa-solid fa-pen-to-square';
            }
        }

        // Student picker / bulk list
        if (singleStudentSec && bulkStudentSec) {
            if (currentMode === 'SINGLE') {
                singleStudentSec.classList.remove('hidden');
                bulkStudentSec.classList.add('hidden');
            } else {
                singleStudentSec.classList.add('hidden');
                bulkStudentSec.classList.remove('hidden');
            }
        }
    } else {
        // Other batches: hide tabs, hide all quick-pick sections, hide notice if present
        if (modeTabs) modeTabs.classList.add('hidden');
        if (coursePresetWrapper) coursePresetWrapper.classList.add('hidden');
        if (coursePresetNotice) coursePresetNotice.classList.add('hidden');
        if (singleStudentSec) singleStudentSec.classList.add('hidden');
        if (bulkStudentSec) bulkStudentSec.classList.add('hidden');
        if (customBulkSec) customBulkSec.classList.add('hidden');
        if (manualToggleRow) manualToggleRow.classList.add('hidden');

        // Always show the manual form fields for other batches
        if (manualWrapper) manualWrapper.classList.remove('hidden');
    }

    updatePreview();
}

// Toggle Manual Fields for 18th Batch
function toggleManualFields() {
    manualFieldsVisible = !manualFieldsVisible;
    updateBatchVisibility();
}

// Mode Switcher function
function switchMode(mode) {
    currentMode = mode;
    const tabSingle = document.getElementById('tabSingleMode');
    const tabBulk = document.getElementById('tabBulkMode');
    const btnSingle = document.getElementById('btnDownloadSingle');
    const btnBulk = document.getElementById('btnDownloadBulk');

    if (mode === 'SINGLE') {
        tabSingle.classList.add('active');
        tabBulk.classList.remove('active');
        btnSingle.classList.remove('hidden');
        btnBulk.classList.add('hidden');
    } else {
        tabBulk.classList.add('active');
        tabSingle.classList.remove('active');
        btnSingle.classList.add('hidden');
        btnBulk.classList.remove('hidden');
    }

    updateBatchVisibility();
}

// Update Canvas Zoom
function updateZoom() {
    const wrapper = document.getElementById('cover-wrapper');
    const zoomText = document.getElementById('zoomValText');
    wrapper.style.transform = `scale(${zoomScale})`;
    zoomText.textContent = `${Math.round(zoomScale * 100)}%`;
}

// ==========================================================================
// 7. PDF GENERATION & EXPORT LOGIC
// ==========================================================================

async function downloadSinglePdf() {
    if (isGenerating) return;
    const element = document.getElementById('cover-page');
    const filename = getPdfFilename(inputs.sname.value, inputs.ccode.value);
    
    isGenerating = true;
    const btn = document.getElementById('btnDownloadSingle');
    const origHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...';
    btn.disabled = true;

    showToast(`Generating ${filename}...`, 'info');

    const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true, scrollY: 0, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
        showToast(`Successfully downloaded: ${filename}`, 'success');
    } catch (err) {
        console.error('PDF Generation Error:', err);
        showToast('Failed to generate PDF. Please try again.', 'error');
    } finally {
        isGenerating = false;
        btn.innerHTML = origHtml;
        btn.disabled = false;
    }
}

// Bulk PDF Batch Generation Loop
async function downloadBulkPdfs() {
    if (isGenerating) return;
    
    let targetList = [];

    if (selectedBatch === '18th') {
        targetList = CSE_18TH_BATCH_STUDENTS.filter(s => selectedStudentIds.has(s.studentId));
        if (targetList.length === 0) {
            showToast('Please select at least 1 student for bulk download.', 'error');
            return;
        }
    } else {
        const rawText = document.getElementById('customBulkInput').value.trim();
        if (!rawText) {
            showToast('Please enter student IDs and names line by line.', 'error');
            return;
        }
        const lines = rawText.split('\n');
        lines.forEach((line, idx) => {
            const parts = line.split(',');
            if (parts.length >= 2) {
                targetList.push({
                    studentId: parts[0].trim(),
                    name: parts.slice(1).join(',').trim()
                });
            } else if (line.trim()) {
                targetList.push({
                    studentId: `ID_${idx + 1}`,
                    name: line.trim()
                });
            }
        });
    }

    if (targetList.length === 0) {
        showToast('No valid students found for bulk download.', 'error');
        return;
    }

    isGenerating = true;
    
    const btn = document.getElementById('btnDownloadBulk');
    const progressWrapper = document.getElementById('bulkProgressWrapper');
    const progressText = document.getElementById('bulkProgressText');
    const percentText = document.getElementById('bulkPercentText');
    const progressBar = document.getElementById('bulkProgressBar');
    
    btn.disabled = true;
    progressWrapper.classList.remove('hidden');
    
    showToast(`Starting bulk download for ${targetList.length} students... Browser may ask for "Allow" on multiple downloads.`, 'info');

    for (let i = 0; i < targetList.length; i++) {
        const student = targetList[i];
        const currentNum = i + 1;
        const percent = Math.round((currentNum / targetList.length) * 100);

        // Update progress UI
        progressText.textContent = `(${currentNum}/${targetList.length}) Generating for ${student.name}...`;
        percentText.textContent = `${percent}%`;
        progressBar.style.width = `${percent}%`;

        // Update Form Inputs to current student
        inputs.sname.value = student.name;
        inputs.sid.value = student.studentId;
        inputs.sbatch.value = selectedBatch;
        updatePreview();

        // Pause 250ms for DOM render
        await new Promise(resolve => setTimeout(resolve, 250));

        const element = document.getElementById('cover-page');
        const filename = getPdfFilename(student.name, inputs.ccode.value);

        const opt = {
            margin: 0,
            filename: filename,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 3, useCORS: true, scrollY: 0, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            await html2pdf().set(opt).from(element).save();
        } catch (err) {
            console.error(`Error generating for ${student.name}:`, err);
        }
    }

    showToast(`Successfully generated all ${targetList.length} PDFs!`, 'success');
    
    // Reset UI
    isGenerating = false;
    btn.disabled = false;
    setTimeout(() => {
        progressWrapper.classList.add('hidden');
        progressBar.style.width = '0%';
    }, 2000);
}

// WhatsApp / Mobile Share Handler
async function shareWhatsApp() {
    const element = document.getElementById('cover-page');
    const filename = getPdfFilename(inputs.sname.value, inputs.ccode.value);

    const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    showToast('Preparing PDF for sharing...', 'info');

    try {
        const blob = await html2pdf().set(opt).from(element).output('blob');
        const file = new File([blob], filename, { type: 'application/pdf' });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'KYAU Cover Page',
                text: `KYAU ${inputs.type.value} Cover Page for ${inputs.sname.value} (${inputs.ccode.value})`
            });
            showToast('Shared successfully!', 'success');
        } else {
            // Fallback to WhatsApp URL sharing
            const text = encodeURIComponent(`KYAU ${inputs.type.value} Cover Page for ${inputs.sname.value} (${inputs.ccode.value})\nTopic: ${inputs.topic.value}`);
            window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
            showToast('Opened WhatsApp share link!', 'success');
        }
    } catch (err) {
        console.error('Sharing failed:', err);
        showToast('Could not share file directly. Try downloading.', 'error');
    }
}

// ==========================================================================
// 8. TOAST NOTIFICATION SYSTEM
// ==========================================================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-info-circle text-indigo';
    if (type === 'success') iconClass = 'fa-circle-check text-emerald';
    if (type === 'error') iconClass = 'fa-triangle-exclamation text-amber';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
