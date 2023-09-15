import { checkSchema } from "express-validator";

const emailValidation = checkSchema({
  email: {
    exists: {
      errorMessage: "Email is required"
    },
    isEmail: {
      bail: true,
      errorMessage: "Email is in wrong format",
      options: {
        allow_ip_domain: false,
        allow_utf8_local_part: true
      }
    }
  }
});

const passwordValidation = checkSchema({
  password: {
    exists: {
      errorMessage: "Password is required"
    },
    trim: true,
    isLength: {
      errorMessage: "Password must have at least 8 character and less than 21",
      options: {
        min: 8,
        max: 20
      }
    },
    matches: {
      errorMessage:
        "Password must have at least one uppercase, lowercase, digit and special character",
      options: new RegExp(
        "(^[\w.-@]{8,20})",
        "g"
      )
    }
  }
});

const firstnameValidation = checkSchema({
  firstname: {
    exists: {
      errorMessage: "FirstName is required"
    },
    trim: true,
    isLength: {
      errorMessage: "FirstName must have length less than 2",
      options: { min: 2 }
    }
  }
});

const lastnameValidation = checkSchema({
  lastname: {
    exists: {
      errorMessage: "LastName is required"
    },
    trim: true,
    isLength: {
      errorMessage: "LastName must have length less than 2",
      options: { min: 2 }
    }
  }
});

const assertRequiredLoginFieldsAreNotEmpty = checkSchema({
  email: {
    exists: {
      errorMessage: "Email is required"
    },
    trim: true
  },
  password: {
    exists: {
      errorMessage: "Password is required"
    },
    trim: true
  }
});

const nameValidation = checkSchema({
  name: {
    exists: {
      errorMessage: "Name is required"
    },
    trim: true,
    isLength: {
      errorMessage: "Name must have length more than 2",
      options: { min: 2 }
    }
  }
});

const descriptionValidation = checkSchema({
  description: {
    exists: {
      errorMessage: "Description is required"
    },
    trim: true,
    isLength: {
      errorMessage: "Description must have length more than 10",
      options: { min: 10 }
    }
  }
});

export {
  passwordValidation,
  emailValidation,
  firstnameValidation,
  lastnameValidation,
  nameValidation,
  descriptionValidation
};

export { assertRequiredLoginFieldsAreNotEmpty };