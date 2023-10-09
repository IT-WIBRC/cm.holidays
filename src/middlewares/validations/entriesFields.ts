import { checkSchema } from "express-validator";
import dayjs from "dayjs";

const emailSchema = {
  email: {
    exists: {
      errorMessage: "Email is required"
    },
    isEmail: {
      bail: true,
      errorMessage: "Email is in wrong format",
      options: {
        allow_utf8_local_part: true,
        require_tld: true,
        ignore_max_length: true,
      }
    },
    normalizeEmail: {
      options: {
        gmail_remove_subaddress: false,
        gmail_lowercase: true,
        gmail_remove_dots: false,
        gmail_convert_googlemaildotcom: true,
        outlookdotcom_lowercase: true,
        outlookdotcom_remove_subaddress: true,
        yahoo_lowercase: true,
        icloud_lowercase: true,
        icloud_remove_subaddress: true
      }
    }
  }
};
const emailValidation = checkSchema(emailSchema);

const passwordValidation = checkSchema({
  password: {
    exists: {
      errorMessage: "Password is required"
    },
    trim: true,
    isLength: {
      errorMessage: "Password must have at least 6 character and less than 11",
      options: {
        min: 6,
        max: 10
      }
    },
    matches: {
      errorMessage:
        "Password must have at least one uppercase, lowercase, digit and special character",
      options: new RegExp(
        "(^[\\w.-@]{8,10})",
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
  lastName: {
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
  ...emailSchema,
  password: {
    exists: {
      errorMessage: "Password is required"
    },
    trim: true
  }
});

const nameSchema = {
  name: {
    notEmpty: {
      options: {
        ignore_whitespace: true
      },
      errorMessage: "Name field is empty"
    },
    exists: {
      errorMessage: "Name is required"
    },
    trim: true,
    isLength: {
      errorMessage: "Name must have length more than 2",
      options: { min: 2 }
    }
  }
};

const nameValidation = checkSchema(nameSchema);

const descriptionValidation = checkSchema({
  description: {
    exists: {
      errorMessage: "Description is required"
    },
    notEmpty: {
      options: {
        ignore_whitespace: false
      },
      errorMessage: "Description field is empty"
    },
    trim: true,
    isLength: {
      errorMessage: "Description must have length more than 10",
      options: { min: 10 }
    }
  }
});

const assertPostCreation = checkSchema({
  ...nameSchema,
  service: {
    notEmpty: {
      options: {
        ignore_whitespace: false
      },
      errorMessage: "Service field is empty"
    },
    exists: {
      errorMessage: "Malformed request (service type is missing)"
    }
  },
  "service.id": {
    exists: {
      errorMessage: "The id field is empty"
    },
    isUUID: {
      errorMessage: "Wrong id is not an uuid"
    }
  }
});

const rolesValidation = checkSchema({
  roles: {
    notEmpty: {
      errorMessage: "Roles are required",
      options: {
        ignore_whitespace: true
      }
    },
    isArray: {
      options: {
        min: 1
      },
      errorMessage: "Roles must be and array"
    }
  }
});

const postsValidation = checkSchema({
  posts: {
    notEmpty: {
      errorMessage: "Posts are required",
      options: {
        ignore_whitespace: true
      }
    },
    isArray: {
      options: {
        min: 1
      },
      errorMessage: "Post must be and array"
    }
  }
});

const assertHolidayRequestCreation = checkSchema({
  type: {
    notEmpty: {
      options: {
        ignore_whitespace: false
      },
      errorMessage: "Holiday Type field is empty"
    },
    exists: {
      errorMessage: "Malformed request (Holiday type is missing)"
    }
  },
  "type.id": {
    exists: {
      errorMessage: "The id field is empty"
    },
    isUUID: {
      errorMessage: "Wrong id is not an uuid"
    }
  },
  startingDate: {
    notEmpty: {
      errorMessage: "The starting date field is empty"
    },
    exists: {
      errorMessage: "The starting date field is required"
    },
    trim: true,
    isDate: {
      errorMessage: "The starting date must be a date",
      options: {
        strictMode: true,
        format: "YYYY-MM-DD"
      }
    },
    custom: {
      errorMessage: "The starting date must be higher than the actual date",
      options: (value) => dayjs().isBefore(value)
    }
  },
  endingDate: {
    notEmpty: {
      errorMessage: "The ending date field is empty"
    },
    exists: {
      errorMessage: "The ending date field is required"
    },
    trim: true,
    isDate: {
      errorMessage: "The ending date field must be a date",
      options: {
        strictMode: true,
        format: "YYYY-MM-DD"
      }
    },
    custom: {
      errorMessage: "The ending date must be higher than the starting date",
      options: (value, { req: { body } }) =>
        dayjs(value).isAfter(body.startingDate)
    }
  },
  returningDate: {
    notEmpty: {
      errorMessage: "The returning date field is empty"
    },
    exists: {
      errorMessage: "The returning date is required"
    },
    trim: true,
    isDate: {
      errorMessage: "The returning date must be a date",
      options: {
        strictMode: true,
        format: "YYYY-MM-DD"
      }
    },
    custom: {
      errorMessage: "The returning date date must be higher than the ending date",
      options: (value, { req: { body } }) =>
        dayjs(value).isAfter(body.endingDate)

    }
  }
});

export {
  passwordValidation,
  emailValidation,
  firstnameValidation,
  lastnameValidation,
  nameValidation,
  descriptionValidation,
  rolesValidation,
  postsValidation
};

export {
  assertRequiredLoginFieldsAreNotEmpty,
  assertPostCreation,
  assertHolidayRequestCreation
};