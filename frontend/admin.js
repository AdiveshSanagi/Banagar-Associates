
        function switchView(viewId) {
            document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active-view'));
            document.querySelectorAll('.admin-nav-link').forEach(link => link.classList.remove('active-tab'));
            document.getElementById('view-' + viewId).classList.add('active-view');
            event.currentTarget.classList.add('active-tab');
        }

        // Real-Time Dynamic Calendar Logic
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // Mock database for already booked dates (Injecting dates relative to the current month for testing)
        let bookedDates = {};
        bookedDates[`${currentYear}-${currentMonth + 1}-10`] = { name: "Sneha Kulkarni", phone: "+91 9876500000", email: "sneha@mail.com", venue: "Banagar Lawns", status: "CONFIRMED" };
        bookedDates[`${currentYear}-${currentMonth + 1}-18`] = { name: "Rahul Deshmukh", phone: "+91 9123400000", email: "rahul@mail.com", venue: "Combo Pack", status: "CONFIRMED" };

        function renderCalendar() {
            const grid = document.getElementById("dynamic-calendar");
            const monthYearText = document.getElementById("calendar-month-year");
            grid.innerHTML = '<div class="cal-header">Sun</div><div class="cal-header">Mon</div><div class="cal-header">Tue</div><div class="cal-header">Wed</div><div class="cal-header">Thu</div><div class="cal-header">Fri</div><div class="cal-header">Sat</div>';
            
            monthYearText.textContent = `${monthNames[currentMonth]} ${currentYear}`;
            
            let firstDay = new Date(currentYear, currentMonth, 1).getDay();
            let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

            // Fill empty days at start
            for(let i=0; i < firstDay; i++) {
                grid.innerHTML += `<div class="cal-day empty-day"></div>`;
            }

            // Fill actual days
            for(let i=1; i <= daysInMonth; i++) {
                let dateKey = `${currentYear}-${currentMonth + 1}-${i}`;
                let booking = bookedDates[dateKey];
                
                if(booking) {
                    // Blocked Date
                    grid.innerHTML += `
                        <div class="cal-day booked-date" onclick='openModal(${JSON.stringify(booking)}, "${dateKey}")'>
                            <span class="cal-date">${i}</span>
                            <span class="blocked-label">BLOCKED</span>
                            <span class="fs-8 mt-1 text-muted text-truncate">${booking.name.split(' ')[0]} Event</span>
                        </div>
                    `;
                } else {
                    // Available Date
                    grid.innerHTML += `<div class="cal-day"><span class="cal-date">${i}</span></div>`;
                }
            }
        }

        function changeMonth(dir) {
            currentMonth += dir;
            if(currentMonth > 11) { currentMonth = 0; currentYear++; }
            if(currentMonth < 0) { currentMonth = 11; currentYear--; }
            renderCalendar();
        }

        function openModal(data, dateStr) {
            document.getElementById('modal-name').textContent = data.name;
            document.getElementById('modal-phone').textContent = data.phone;
            document.getElementById('modal-email').textContent = data.email;
            document.getElementById('modal-venue').textContent = data.venue;
            document.getElementById('modal-status').textContent = data.status;
            document.getElementById('modal-date').textContent = dateStr;
            
            let myModal = new bootstrap.Modal(document.getElementById('bookingModal'));
            myModal.show();
        }

        // Initialize Calendar on load
        document.addEventListener("DOMContentLoaded", renderCalendar);

        // Profile view logic of admin panel
        function previewAvatar(event) {
            const input = event.target;
            const previewImage = document.getElementById('admin-avatar-preview');
            
            // Check if a file was selected
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                
                // When the file is loaded, update the image source
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }

        