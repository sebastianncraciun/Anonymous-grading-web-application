
function Form_Send() {
  return (
    <div>
      <h5>Write your Email</h5>
      <input type="text" value={email} onChange={(evt) => verifyEmail(evt.target.value)} />
      <h5>Type your password</h5>
      <input type="text" value={password} onChange={(evt) => verifyPassword(evt.target.value)} />
      <br></br>
      <input type='button' value='Verify' onClick={handleClick} />
    </div>
  );
}

export default Form_Send;
