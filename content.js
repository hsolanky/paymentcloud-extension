    window.addEventListener('message', event => {
        // IMPORTANT: check the origin of the data! 
        if (event.origin.startsWith('https://crm.zoho.com') &&  
            (document.URL.startsWith("https://desk.zoho.com/support/paymentcloudinc/ShowHomePage.do?frameorigin"))) {

            console.log(document.URL,event.data); 
            let mmid = event.data.mmid
            let subName = event.data.submissionName
            
            if(mmid.length < 1){
                mmid = "No MID"
            }

            let subjectInput = document.querySelector('input[data-id="subject"]')
            if(subjectInput){
                subjectInput.value = mmid + " - " + subName  
            }
            
        }else if (event.origin.startsWith('https://desk.zoho.com') &&  
        (document.URL.startsWith("https://crm.zoho.com/crm/org49631815/tab/Potentials/"))) {
            let msg = event.data.msg;
            if(msg == 'sendSubject')    {
                let createTicketIframe = document.querySelector('iframe#createTicketIframe')
                let MMID = document.getElementById("subvalue_POTENTIALCF165").innerHTML
                let submissionName = document.getElementById("subvalue_POTENTIALNAME").innerHTML
                createTicketIframe.contentWindow.postMessage({msg:"hsxo", mmid: MMID, submissionName: submissionName}, '*');
            }
        }
         else {
            // The data was NOT sent from your site! 
            // Be careful! Do not use it. This else branch is
            // here just for clarity, you usually shouldn't need it.
            return; 
        } 
    }); 


    function myPCHelper() {
        if(window.location.href.indexOf("https://desk.zoho.com/support/paymentcloudinc/ShowHomePage.do?frameorigin") == 0){
            var setIntMain = setInterval(function(){
                let subjectInput = document.querySelector('input[data-id="subject"]')
                if(subjectInput){
                    clearInterval(setIntMain)
                    window.parent.postMessage({msg:"sendSubject"}, '*')
                }
            },1000)
        }
    }

window.addEventListener("load", myPCHelper)