$('#fbtn').click(async function(e) {
    if (! $('form')[0].reportValidity()) {
        return false;
    }

    /*
    const email = $('#email').val();
    const pass = $('#password').val();
    const query = {
        email: email,
        pass: pass
    }
    
    await postData('/sessions/new', query)
    then(res => {
        console.log("AAAAAAAAAAAAAAAA");
        if(!res.ok) {
            console.log(res);
            //location.href = "/?message=メールアドレス・パスワードが違います&status=1"
        } else {
            console.log(res);
            
        }
    });
    */
   $('form').submit();

})