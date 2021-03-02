const handleContactFormSubmission = (e) => {
    e.preventDefault();

    iziToast.show({
        title: 'Sending please wait...',
        titleColor: '#fff',
        class: 'bg-success',
        timeout: 0
    });

    let data = {};
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    for (let key of formData.keys()) {
        data[key] = formData.get(key);
    }

    const htmlTemplate =
        `<div style="max-width: 480px; margin: 25px auto; border: 2px solid #f57b51;">
            <div style="box-shadow: 5px 10px 18px rgba(0, 0, 0, 0.2); padding: 8px 16px; background-color: #ffffff;">
                <h2 style="color: #df0e62; text-align: center; margin: 8px 0 0 0;">Chandhanakalaoodinn</h2>
                <h4 style="color: #127681; text-align: center;">New Form Submission from ${data.Name}</h4>
                <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); padding: 8px 16px; background-color: #f1f1f1;">
                    <h3 style="color: #f57b51;">Email: <span style="color: #127681;">${data.Email}</span></h3>
                    <h3 style="color: #f57b51;">Mobile: <span style="color: #127681;">${data.Mobile}</span></h3>
                    <h3 style="color: #f57b51;">Message: <h4 style="color: #555555;">${data.Message}</h4></h3>
                </div>
            <div style="background-color: #f57b51; text-align: center; padding: 8px 16px;">
                <h4 style="color: #ffffff; text-transform: uppercase; margin: 0;">
                MailBot &nbsp; by &nbsp; <a style="color: #ffffff; text-decoration: none;" href="https://vishnucprasad.github.io">Vishnu C Prasad</a>
                </h4>
            </div> 
        </div>`;

    $.ajax({
        url: "https://vcp-mail-api.herokuapp.com/api/send-mail",
        method: "post",
        data: {
            to: "ckfoodinn@outlook.com",
            name: data.Name,
            subject: data.Subject,
            html: htmlTemplate
        },
        success: (response) => {
            if (response.accepted[0] === "ckfoodinn@outlook.com") {
                const toast = document.querySelector('.iziToast');

                iziToast.hide({
                    transitionOut: 'fadeOutUp'
                }, toast);

                iziToast.show({
                    title: 'Your message has been sent. Thank you!',
                    titleColor: '#fff',
                    class: 'bg-success'
                });
            }
            console.log(response);
        },
        error: (error) => {
            if(error) {
                const toast = document.querySelector('.iziToast');

                iziToast.hide({
                    transitionOut: 'fadeOutUp'
                }, toast);

                iziToast.show({
                    title: "Form submission failed, Can't connect to the server!",
                    titleColor: '#fff',
                    class: 'bg-danger'
                });
            }
        }
    })
}